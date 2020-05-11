import requests
from dotenv import load_dotenv
import os

load_dotenv()

def login():
    result = {}
    try:
        url = "http://52.76.55.94:3000/api/v1/login"
        resp = requests.post(url, json={'username':os.getenv("CSLC_USERNAME"),'password':os.getenv("CSLC_PASSWORD")})
        result = resp.json()
    except Exception as e:
        result = {'Status':'Failed', 'Message':e}
    finally:
        return result

def getStatisticbyIdGedung(idgedung):
    result = {}
    try:
        idgedung = idgedung.replace(" ","+")
        url = "http://52.76.55.94:3000/api/v1/statistic?idgedung=" + idgedung
        resp = requests.get(url)
        result = resp.json()
    except Exception as e:
        result = {'Status':'Failed', 'Message':e}
    finally:
        return result

def getAllGedung():
    result = {}
    try:
        login_result = login()
        if (login_result['Status'] == 'Success'):
            url = "http://52.76.55.94:3000/api/v1/gedung/list"
            resp = requests.get(url, headers={'Authorization': login_result['Token']})
            result = resp.json()
        else:
            result = login_result
    except Exception as e:
        result = {'Status':'Failed', 'Message':e}
    finally:
        return result         



#print(getStatisticbyIdGedung("Labtek VI"))
#print(login())
#print(getAllGedung())
    