from django.core.management.base import BaseCommand
import re
import io
import itertools as it
from attendees.models import *


EMAIL_ADDRESS = "email_address"
PROJECT_MEMBERS = "project_memebers"
TICKET_ID = "ticket_id"
PROJECT_NAME = "project_name"
PRODUCT_DESCRIPTION = "product_description"
LOGO = "logo"
COMPANY_URL = "company_url"
TELEGRAM = "telegram"
TWITTER = "twitter"
FUNDING_AMOUNT = "funding_amount"
WHITEPAPER_URL = "Whitepaper URL"
FEATURED_PRESS_URL = "Featured Press URL"
TAGLINE = "Tagline"

TOKEN_TYPE = "TokenType"
TOKEN_TYPE_UTILITY = "UTILITY"
TOKEN_TYPE_PROTOCOLS = "PROTOCOL"
TOKEN_TYPE_SECURITY = "SECURITY"

PRODUCT_STAGE = "ProductStage"
STAGE_PRE_PRODUCT = "PRE_PRODUCT"
STAGE_LIVE_PRODUCT = "LIVE_PRODUCT"
STAGE_LIVE_PRODUCT_REVENUE = "LIVE_PRODUCT_WITH_REVENUE"

FUNDING_STAGE = "FundingStage"
FUNDING_SEED = "SEED"
FUNDING_POST_ICO = "PRE_ICO"
FUNDING_PRE_ICO = "POST_ICO"

NOTABLE_MEMBERS = "notable"

INVESTOR_REGION = "InvestorNationality"
REGION_ANYWHERE = "ANYWHERE"
REGION_EXCEPT_US = "EXCEPT_US"
REGION_KOREA_ONLY = "KOREA_ONLY"

GIVEAWAY_TYPE = "InvestorBuys"
GIVEAWAY_TOKEN = "TOKEN"
GIVEAWAY_EQUITY = "EQUITY"
GIVEAWAY_BOTH = "BOTH"

MORE_INFORMATION = "more_info"
INDUSTRY = "Industry"

# Parameters
FILE = "file"


class Command(BaseCommand):
    help = 'Ingests a file with project information into the database. ' \
           'The old format for this form contained multiple checkboxes with the same name, ' \
           'so the data overwrites each other.'

    def __init__(self, *args, **kwargs):
        super(Command, self).__init__(*args, **kwargs)
        self.patterns = {EMAIL_ADDRESS: 'Email Address: ',
                         PROJECT_MEMBERS: 'Project Members Emails: ',
                         TICKET_ID: 'Eventbrite Ticket or Order #: ',
                         PROJECT_NAME: 'Project Name: ',
                         PRODUCT_DESCRIPTION: 'Product Description: ',
                         LOGO: 'Link to Logo: ',
                         COMPANY_URL: 'Company URL: ',
                         TELEGRAM: 'TG Username: ',
                         TWITTER: 'Twitter handle: ',
                         FUNDING_AMOUNT: 'Funding amount: ',
                         TOKEN_TYPE: 'TokenType: ',
                         FUNDING_STAGE: FUNDING_STAGE + ": ",
                         PRODUCT_STAGE: PRODUCT_STAGE + ": ",
                         NOTABLE_MEMBERS: 'Notable members/advisors: ',
                         INVESTOR_REGION: INVESTOR_REGION + ": ",
                         GIVEAWAY_TYPE: GIVEAWAY_TYPE + ": ",
                         MORE_INFORMATION: 'More information: ',
                         INDUSTRY: 'Industry: ',
                         WHITEPAPER_URL: WHITEPAPER_URL + ": ",
                         FEATURED_PRESS_URL: FEATURED_PRESS_URL + ": ",
                         TAGLINE: TAGLINE + ": "}

        self.projects = 0
        self.members = 0

        self.funding_stage_seed = FundingStage.objects.get(name=FUNDING_SEED)
        self.funding_stage_pre_ico = FundingStage.objects.get(name=FUNDING_PRE_ICO)
        self.funding_stage_post_ico = FundingStage.objects.get(name=FUNDING_POST_ICO)

        self.giveaway_token = Giveaway.objects.get(name=GIVEAWAY_TOKEN)
        self.giveaway_equity = Giveaway.objects.get(name=GIVEAWAY_EQUITY)
        self.giveaway_both = Giveaway.objects.get(name=GIVEAWAY_BOTH)

        self.product_stage_pre = ProductStage.objects.get(name=STAGE_PRE_PRODUCT)
        self.product_stage_live = ProductStage.objects.get(name=STAGE_LIVE_PRODUCT)
        self.product_stage_revenue = ProductStage.objects.get(name=STAGE_LIVE_PRODUCT_REVENUE)

        self.token_type_protocol = TokenType.objects.get(name=TOKEN_TYPE_PROTOCOLS)
        self.token_type_utility = TokenType.objects.get(name=TOKEN_TYPE_UTILITY)
        self.token_type_security = TokenType.objects.get(name=TOKEN_TYPE_SECURITY)

        self.investor_region_anywhere = Region.objects.get(id=Region.ANYWHERE)
        self.investor_region_except_us = Region.objects.get(id=Region.ANYWHERE_EXCEPT_UNITED_STATES)
        self.investor_region_korea_only = Region.objects.get(id=Region.SOUTH_KOREA_ONLY)

        industries = Industry.objects.all()
        self.industries = {}
        for industry in industries:
            self.industries[industry.name] = industry

    def add_arguments(self, parser):
        parser.add_argument('--' + FILE)

    def handle(self, *args, **options):
        file_name = options[FILE]
        self.stdout.write('Processing file "%s"' % file_name)
        with io.open(file_name, encoding="utf-8") as f:
            for key, group in it.groupby(f, lambda line: line.startswith('----')):
                if not key:  # keys are the lines with "----"
                    self.process_project(list(group))
        self.stdout.write("Processed %s projects and %s members" %
                          (self.projects, self.members))

    def get_funding_stage(self, values):
        funding_stage = values[FUNDING_STAGE]
        if funding_stage == "":
            return None
        if funding_stage == FUNDING_SEED:
            return self.funding_stage_seed
        if funding_stage == FUNDING_PRE_ICO:
            return self.funding_stage_pre_ico
        if funding_stage == FUNDING_POST_ICO:
            return self.funding_stage_post_ico
        raise ValueError("Unrecognized funding stage: %s" % funding_stage)

    def get_giveaway(self, values):
        giveaway = values[GIVEAWAY_TYPE]
        if giveaway == "":
            return None
        if giveaway == GIVEAWAY_BOTH:
            return self.giveaway_both
        if giveaway == GIVEAWAY_EQUITY:
            return self.giveaway_equity
        if giveaway == GIVEAWAY_TOKEN:
            return self.giveaway_token
        raise ValueError("Unrecognized giveaway: %s" % giveaway)

    def get_investor_region(self, values):
        region = values[INVESTOR_REGION]
        if region == "":
            return None
        if region == REGION_ANYWHERE:
            return self.investor_region_anywhere
        if region == REGION_EXCEPT_US:
            return self.investor_region_except_us
        if region == REGION_KOREA_ONLY:
            return self.investor_region_korea_only
        raise ValueError("Unrecognized investor region: %s" % region)

    def get_product_stage(self, values):
        product_stage = values[PRODUCT_STAGE]
        if product_stage == "":
            return None
        if product_stage == STAGE_PRE_PRODUCT:
            return self.product_stage_pre
        if product_stage == STAGE_LIVE_PRODUCT:
            return self.product_stage_live
        if product_stage == STAGE_LIVE_PRODUCT_REVENUE:
            return self.product_stage_revenue
        raise ValueError("Unrecognized product stage: %s" % product_stage)

    def get_token_type(self, values):
        token_type = values[TOKEN_TYPE]
        if token_type == "":
            return None
        if token_type == TOKEN_TYPE_SECURITY:
            return self.token_type_security
        if token_type == TOKEN_TYPE_PROTOCOLS:
            return self.token_type_protocol
        if token_type == TOKEN_TYPE_UTILITY:
            return self.token_type_utility
        raise ValueError("Unrecognized token type: %s" % token_type)

    def set_project_values(self, values, project):
        project.description = values[PRODUCT_DESCRIPTION]
        if len(project.description) > 250:
            raise ValueError("Description is too long for %s" % project.name)

        project.image_url = values[LOGO]
        project.website = values[COMPANY_URL]

        project.telegram = values[TELEGRAM]
        project.twitter = values[TWITTER]

        amount_string = values[FUNDING_AMOUNT]
        amount_string = re.sub('[$,]', '', amount_string)
        if amount_string != "":
            project.fundraising_amount = int(amount_string)

        project.notable = values[NOTABLE_MEMBERS]
        project.whitepaper = values[WHITEPAPER_URL]
        project.news = values[FEATURED_PRESS_URL]
        project.tagline = values[TAGLINE]

        funding_stage = self.get_funding_stage(values)
        giveaway = self.get_giveaway(values)
        investor_region = self.get_investor_region(values)
        product_stage = self.get_product_stage(values)
        token_type = self.get_token_type(values)

        project.save()

        project.funding_stage = funding_stage
        project.giveaway = giveaway
        project.region = investor_region
        project.product_stage = product_stage
        project.token_type = token_type
        project.save()

    def add_project_member(self, email, project):
        self.members += 1
        member, created = ProjectMember.objects.get_or_create(email=email, defaults={'project': project})
        if created:
            self.stdout.write("Created member %s for project %s" % (email, project.name))
            member.save()
        else:
            self.stdout.write("Updating member %s for project %s" % (email, project.name))

    def process_project(self, project_lines):
        self.projects += 1
        values = {}

        for raw_line in project_lines:
            line = raw_line.strip("\n")
            if line.endswith(":"):
                # Ensure empty fields still match the regexes
                line += " "
            for key, regex in self.patterns.iteritems():
                match = re.match(regex + '(.*)', line)
                if match:
                    values[key] = match.group(1)

        project_name = values[PROJECT_NAME].capitalize()

        industry_string = values[INDUSTRY]
        industry = self.industries[industry_string]

        project, created = Project.objects.get_or_create(name=project_name, industry=industry)
        if created:
            self.stdout.write("Created project %s" % project_name)
        else:
            self.stdout.write("Updating project %s" % project_name)

        self.set_project_values(values=values, project=project)

        # Create project members
        email = values[EMAIL_ADDRESS]
        self.add_project_member(email=email, project=project)

        members_string = values[PROJECT_MEMBERS].strip()
        if len(members_string) > 0:
            members = [x.strip() for x in members_string.split(',')]
            for member_email in members:
                self.add_project_member(email=member_email, project=project)

