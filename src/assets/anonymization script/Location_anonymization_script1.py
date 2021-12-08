# From https://medium.com/@ggonzalezzabala/graph-your-own-google-location-history-in-tableau-e362d1d8f18d
# github: https://github.com/gabrielgz92/location_history_data/blob/master/key_value_parsing.py

import pandas as pd
import numpy as np
import datetime as dt
import json
import csv
import re

# ----------------------------------------------------------------------------------------------------------------------
## User input of home address
address_input = input("Please enter your home address:\n")
print(f'You entered home address: "{address_input}"')

#Input "Heidelberglaan"

# ----------------------------------------------------------------------------------------------------------------------
#Creates list from placeVisit data

def placeVisit(placeVisit_dict):
    #place_id = placeVisit_dict["location"]["placeId"]
    #lat = placeVisit_dict["location"]["latitudeE7"]
    #lon = placeVisit_dict["location"]["longitudeE7"]
    address = placeVisit_dict["location"]["address"].replace("\n",", ")
    start_time = placeVisit_dict["duration"]["startTimestampMs"]
    end_time = placeVisit_dict["duration"]["endTimestampMs"]
    #confidence = placeVisit_dict["visitConfidence"]

    #Formatting variables
    #lat = int(lat)/1e7
    #lon = int(lon)/1e7
    start_time_dt = timeStampToDate(int(start_time))
    end_time_dt = timeStampToDate(int(end_time))
    home_address = bool(re.match(address_input, address))
    #place_visit = [place_id, lat, lon, address, start_time, end_time, start_time_dt, end_time_dt, confidence, home_address]
    place_visit = [address, start_time, end_time, start_time_dt, end_time_dt, home_address]
    return place_visit

#Convert milliseconds timestamp into a readable date.
def timeStampToDate(milliseconds):
    date = dt.datetime.fromtimestamp(milliseconds/1000.0)
    date = date.strftime('%Y-%m-%d %H:%M:%S')
    return date

#Method to run all the scripts.
def parse_data(data):
    for data_unit in data["timelineObjects"]:
      if "placeVisit" in data_unit.keys():
        write_places_csv(placeVisit(data_unit["placeVisit"]))

#Write to CSV.
def write_places_csv(place_data_list):
  with open('FULL_places.csv', 'a', newline='') as file:
    writer = csv.writer(file, delimiter=',')
    writer.writerow(place_data_list)
print("\nList exported to csv file")

#-------------------------------------------------------------------------------
files = ["2019/2019_JANUARY.json", "2020/2020_JANUARY.json"]

for file in files:
  with open(f"SemanticLocationHistory/{file}") as f:
    data = json.load(f)
  parse_data(data)

# ----------------------------------------------------------------------------------------------------------------------
#full_places = pd.read_csv("FULL_places.csv", header=None, names=['place_id','lat', 'lon', 'address', 'start_time', 'end_time','start_time_dt', 'end_time_dt', 'confidence', 'home_address'])
full_places = pd.read_csv("FULL_places.csv", header=None, names=['address', 'start_time', 'end_time','start_time_dt', 'end_time_dt', 'home_address'])
full_places

# ----------------------------------------------------------------------------------------------------------------------
# #### Duration
# Change to datetime to calculate duration
full_places["start_time_dt"] = list(map(lambda x: dt.datetime.strptime(x, '%Y-%m-%d %H:%M:%S'), full_places["start_time_dt"]))
full_places["end_time_dt"] = list(map(lambda x: dt.datetime.strptime(x, '%Y-%m-%d %H:%M:%S'), full_places["end_time_dt"]))

#duration in days and hours
full_places["duration"] = full_places["end_time_dt"] - full_places["start_time_dt"]
#duration in total seconds
full_places["duration_sec"] = list(map(lambda x: x.total_seconds()/60, full_places["duration"]))

# ----------------------------------------------------------------------------------------------------------------------
# #### Home address and year
## Select rows where home address is true
df_home = full_places.loc[full_places['home_address'] == True]

## Add column with year for extraction
df_home['year'] = df_home['start_time_dt'].dt.year

## Calculate lenght of month
start_month = pd.Timestamp('20200101000000')
end_month = pd.Timestamp('20200131235959')
jan_len = end_month - start_month

# ----------------------------------------------------------------------------------------------------------------------
## Calculate the time duration at home in months for different years

#Month 2019
month2019 = df_home.loc[df_home['year'] == 2019]['duration'].sum()
month2019_per = (month2019/jan_len*100)
#print("Percentage home in month 2020: " "%.2f" % month2019_per, "%")

#Month 2020
month2020 = df_home.loc[df_home['year'] == 2020]['duration'].sum()
month2020_per = (month2020/jan_len*100)
#print("Percentage home month 2020: " "%.2f" % month2020_per, "%")

# ----------------------------------------------------------------------------------------------------------------------
# Contingency table to export

hometimes = pd.DataFrame([[month2019_per, month2020_per]],
                         columns=['Month 2019', 'Month 2020'],
                         index=['Percentage at home'])

print(hometimes)
