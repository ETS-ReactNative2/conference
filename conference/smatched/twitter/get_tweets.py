#!/usr/bin/env python
# encoding: utf-8

from . import models
import os
import tweepy

def getTweets(screen_name):
    #Twitter only allows access to a users most recent 3240 tweets with this method

    #authorize twitter, initialize tweepy
    auth = tweepy.OAuthHandler(
        os.environ.get('CONFERENCE_TWITTER_CONSUMER_KEY'),
        os.environ.get('CONFERENCE_TWITTER_CONSUMER_SECRET')
    )
    auth.set_access_token(
        os.environ.get('CONFERENCE_TWITTER_ACCESS_KEY'),
        os.environ.get('CONFERENCE_TWITTER_ACCESS_SECRET')
    )
    api = tweepy.API(auth)

    #initialize a list to hold all the tweepy Tweets
    alltweets = []

    #make initial request for most recent tweets (200 is the maximum allowed count)
    new_tweets = api.user_timeline(screen_name=screen_name, count=200)

    #save most recent tweets
    alltweets.extend(new_tweets)

    #save the id of the oldest tweet less one
    oldest = alltweets[-1].id - 1

    #keep grabbing tweets until there are no tweets left to grab
    while len(new_tweets) > 0:
        print("getting tweets before %s" % (oldest))

        #all subsiquent requests use the max_id param to prevent duplicates
        new_tweets = api.user_timeline(screen_name=screen_name, count=200, max_id=oldest)

        #save most recent tweets
        alltweets.extend(new_tweets)

        #update the id of the oldest tweet less one
        oldest = alltweets[-1].id - 1

        print("...%s tweets downloaded so far" % (len(alltweets)))

        #transform the tweepy tweets into a 2D array that will populate the csv
        tweets = [[tweet.id_str, tweet.created_at, tweet.text.encode("utf-8")] for tweet in alltweets]

    return tweets
