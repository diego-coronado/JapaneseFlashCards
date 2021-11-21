from bs4 import BeautifulSoup
import requests
import json
import time

base_url = "https://jisho.org/search/%23jlpt-n1%20%23kanji"
i = 1
kanji_arr = []
while(True):
    url = base_url + f"?page={i}"
    print(f"url: {url}")
    result = requests.get(url)
    doc = BeautifulSoup(result.text, "html.parser")
    kanjis = doc.find_all(class_="kanji_light_content")
    print(f"kanjis {len(kanjis)}")
    i += 1
    if(len(kanjis) == 0):
        break
    for j in range(len(kanjis)):
        kanji = kanjis[j].find(class_="character").text

        meanings_tag = kanjis[j].find(class_="meanings")
        meanings = [span.text.split(",")[0]
                    for span in meanings_tag.find_all("span")]

        on_group = kanjis[j].find(class_="on")
        on_readings = []
        if(on_group):
            on_tags = on_group.find_all(class_="japanese_gothic")
            on_readings = [tag.text.split("、")[0] for tag in on_tags]

        kun_group = kanjis[j].find(class_="kun")
        kun_readings = []
        if(kun_group):
            kun_tags = kun_group.find_all(class_="japanese_gothic")
            kun_readings = [tag.text.split("、")[0] for tag in kun_tags]

        kanji_obj = {
            "kanji": kanji,
            "meanings": meanings,
            "on": on_readings,
            "kun": kun_readings
        }
        kanji_arr.append(kanji_obj)
    time.sleep(1)

print(len(kanji_arr))
with open('kanji_list_n1.txt', 'w') as outfile:
    json.dump(kanji_arr, outfile)
