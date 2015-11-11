import requests
import json

aid =
akey =
r = json.loads(requests.get('https://external.api.yle.fi/v1/programs/items.json?app_id=' + aid + '&app_key='+ akey + '&category=5-131&availability=ondemand&mediaobject=video&type=TVProgram').content)
print(r['data'['title']])
