import sys;
import json;
from autoscraper import AutoScraper

url = sys.argv[1];

# We can add one or multiple candidates here.
# You can also put urls here to retrieve urls.
wanted_list = [sys.argv[2]];
scraper = AutoScraper()
scraper.build(url, wanted_list)
result=scraper.get_result_similar(url, unique=False)
print(json.dumps(result)); 
sys.stdout.flush()