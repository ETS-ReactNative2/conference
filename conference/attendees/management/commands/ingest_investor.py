from django.core.management.base import BaseCommand
import re
import io
import itertools as it
from attendees.models import *

TRUE = "true"

LINKED_IN = "linked_in"
PREV_INVESTMENTS = "prev_investments"
INDUSTRIES = "industries"
COMPANY_WEBSITE = "company_website"
JOB_TITLE = "job_title"
COMPANY_NAME = "company_name"
FAMILY_NAME = "family_name"
GIVEN_NAME = "given_name"
NATIONALITY = "nationality"
PRODUCT_STAGE = "product_stage"

SEED = "Seed"
PRE_ICO = "Pre-ICO"
POST_ICO = "Post-ICO"

SECURITY_TOKENS = "security_tokens"
APP_TOKENS = "app_tokens"
PROTOCOLS = "protocols"

GIVEAWAY = "giveaway"
TICKET_SIZE = "ticket_size"
EMAIL_ADDRESS = "email_address"

TICKET_SIZE_5K = "<5k"
TICKET_SIZE_25K = "5k-25k"
TICKET_SIZE_100K = "25k-100k"
TICKET_SIZE_1M = "100k-1M"
TICKET_SIZE_10M = "1M-10M"
TICKET_SIZE_INFINITE = ">10M"

PRE_PRODUCT = 'PRE_PRODUCT'
LIVE_PRODUCT = 'LIVE_PRODUCT'
LIVE_PRODUCT_WITH_REVENUE = 'LIVE_PRODUCT_WITH_REVENUE'


class Command(BaseCommand):
    help = 'Ingests a file with investor information into the database'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self.patterns = {GIVEN_NAME: "First Name: ",
                         FAMILY_NAME: 'Last name: ',
                         COMPANY_NAME: 'company name: ',
                         JOB_TITLE: 'Job Title: ',
                         EMAIL_ADDRESS: 'Email Address: ',
                         COMPANY_WEBSITE: 'Company Website: ',
                         NATIONALITY: 'Nationality: ',
                         INDUSTRIES: 'What market or industries you interested in\?: ',
                         PREV_INVESTMENTS: 'Name 3 companies you have invested in:: ',
                         PROTOCOLS: 'Protocols: ',
                         APP_TOKENS: 'App Tokens: ',
                         SECURITY_TOKENS: 'Security Tokens: ',
                         TICKET_SIZE_5K: TICKET_SIZE_5K + ": ",
                         TICKET_SIZE_25K: TICKET_SIZE_25K + ": ",
                         TICKET_SIZE_100K: TICKET_SIZE_100K + ": ",
                         TICKET_SIZE_1M: TICKET_SIZE_1M + ": ",
                         TICKET_SIZE_10M: TICKET_SIZE_10M + ": ",
                         TICKET_SIZE_INFINITE: TICKET_SIZE_INFINITE + ": ",
                         SEED: SEED + ': ',
                         PRE_ICO: PRE_ICO + ": ",
                         POST_ICO: POST_ICO + ": ",
                         GIVEAWAY: 'Looking to receive: ',
                         PRE_PRODUCT: PRE_PRODUCT + ": ",
                         LIVE_PRODUCT: LIVE_PRODUCT + ": ",
                         LIVE_PRODUCT_WITH_REVENUE: LIVE_PRODUCT_WITH_REVENUE + ": ",
                         LINKED_IN: 'LinkedIn: '}

        self.investors = 0

        self.funding_stage_seed = FundingStage.objects.get(name='SEED')
        self.funding_stage_pre_ico = FundingStage.objects.get(name='PRE_ICO')
        self.funding_stage_post_ico = FundingStage.objects.get(name='POST_ICO')

        self.giveaway_token = Giveaway.objects.get(name='TOKEN')
        self.giveaway_equity = Giveaway.objects.get(name='EQUITY')

        self.product_stage_pre = ProductStage.objects.get(name=PRE_PRODUCT)
        self.product_stage_live = ProductStage.objects.get(name=LIVE_PRODUCT)
        self.product_stage_revenue = ProductStage.objects.get(name=LIVE_PRODUCT_WITH_REVENUE)
        self.product_stage_mapping = {PRE_PRODUCT: self.product_stage_pre,
                                      LIVE_PRODUCT: self.product_stage_live,
                                      LIVE_PRODUCT_WITH_REVENUE: self.product_stage_revenue}

        self.ticket_size_mapping = {TICKET_SIZE_5K: TicketSize.objects.get(id=1),
                                    TICKET_SIZE_25K: TicketSize.objects.get(id=2),
                                    TICKET_SIZE_100K: TicketSize.objects.get(id=3),
                                    TICKET_SIZE_1M: TicketSize.objects.get(id=4),
                                    TICKET_SIZE_10M: TicketSize.objects.get(id=5),
                                    TICKET_SIZE_INFINITE: TicketSize.objects.get(id=6)}

        self.token_protocols = TokenType.objects.get(name='PROTOCOL')
        self.token_apps = TokenType.objects.get(name='UTILITY')
        self.token_security = TokenType.objects.get(name='SECURITY')

    def add_arguments(self, parser):
        parser.add_argument('--file')

    def handle(self, *args, **options):
        file_name = options['file']
        self.stdout.write('Processing file "%s"' % file_name)
        with io.open(file_name, encoding="utf-8") as f:
            for key, group in it.groupby(f, lambda line: line.startswith('----')):
                if not key:   # keys are the lines with "----":
                    self.process_investor(list(group))
        self.stdout.write("Processed %s investors" % self.investors)

    def get_giveaways(self, values):
        giveaways = []
        if values[GIVEAWAY] == "Tokens":
            giveaways.append(self.giveaway_token)
        if values[GIVEAWAY] == "Equity":
            giveaways.append(self.giveaway_equity)
        if values[GIVEAWAY] == "Both":
            giveaways.append(self.giveaway_token)
            giveaways.append(self.giveaway_equity)
        return giveaways

    def get_funding_stages(self, values):
        stages = []
        if values[SEED] == TRUE:
            stages.append(self.funding_stage_seed)
        if values[PRE_ICO] == TRUE:
            stages.append(self.funding_stage_pre_ico)
        if values[POST_ICO] == TRUE:
            stages.append(self.funding_stage_post_ico)
        return stages

    def get_token_types(self, values):
        tokens = []
        if values[PROTOCOLS] == TRUE:
            tokens.append(self.token_protocols)
        if values[APP_TOKENS] == TRUE:
            tokens.append(self.token_apps)
        if values[SECURITY_TOKENS] == TRUE:
            tokens.append(self.token_security)
        return tokens

    def get_ticket_sizes(self, values):
        tickets = []
        for size, obj in self.ticket_size_mapping.iteritems():
            if values[size] == TRUE:
                tickets.append(obj)
        return tickets

    def get_product_stages(self, values):
        product_stages = []
        for product_stage, obj in self.product_stage_mapping.iteritems():
            if values[product_stage] == TRUE:
                product_stages.append(obj)
        return product_stages

    def get_or_none(self, model, *args, **kwargs):
        try:
            return model.objects.get(*args, **kwargs)
        except model.DoesNotExist:
            return None

    def process_investor(self, investor_lines):
        self.investors += 1
        values = {}
        for raw_line in investor_lines:
            line = raw_line.strip()
            if line.endswith(":"):
                # Ensure empty fields still match the regexes
                line += " "
            for key, regex in self.patterns.iteritems():
                match = re.match(regex + '(.*)', line)
                if match:
                    values[key] = match.group(1)

        email_address = values[EMAIL_ADDRESS]
        investor, created = Investor.objects.get_or_create(email=email_address)
        if created:
            self.stdout.write("Created investor %s" % email_address)
        else:
            self.stdout.write("Updating investor %s" % email_address)

        funding_stages = self.get_funding_stages(values)
        giveaways = self.get_giveaways(values)
        nationality = values[NATIONALITY]

        product_stages = self.get_product_stages(values)
        ticket_size = self.get_ticket_sizes(values)
        token_types = self.get_token_types(values)

        if len(nationality) == 2:
            investor.nationality = nationality
        else:
            self.stderr.write("Couldn't save nationality longer than 2 chars: %s" % nationality)

        investor.save()

        investor.funding_stages.add(*funding_stages)
        investor.giveaways.add(*giveaways)
        investor.product_stages.add(*product_stages)
        investor.ticket_sizes.add(*ticket_size)
        investor.token_types.add(*token_types)
        investor.save()

        conference_user = None
        user = self.get_or_none(User, email=investor.email)
        if user:
            conference_user = user.conference_user
            self.stdout.write("Found user %s %s for %s" % (conference_user.first_name,
                                                           conference_user.last_name,
                                                           investor.email))
            conference_user.investor = investor
            conference_user.save()

        if not conference_user:
            conference_user, created = ConferenceUser.objects.get_or_create(investor=investor)

            if created:
                self.stdout.write("Created investor conference user %s" % email_address)
            else:
                self.stdout.write("Updating investor conference user %s" % email_address)
        conference_user.first_name = values[GIVEN_NAME].capitalize()
        conference_user.last_name = values[FAMILY_NAME].capitalize()
        conference_user.title = values[JOB_TITLE].capitalize()
        conference_user.company = values[COMPANY_NAME].capitalize()
        conference_user.linkedin = values[LINKED_IN]

        conference_user.save()
