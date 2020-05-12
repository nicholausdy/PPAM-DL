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

def insertPrediction(idgedung,biaya_today,biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas):
    result = {}
    try:
        login_result = login()
        if (login_result['Status'] == 'Success'):
            url = "http://52.76.55.94:3000/api/v1/prediction/add"
            data_json = {'idgedung':idgedung,'biaya_today':biaya_today,'biaya_week':biaya_week, 'biaya_year':biaya_year, 'jumlah_lampu_avg':jumlah_lampu_avg,'jumlah_kelas':jumlah_kelas}
            resp = requests.post(url, headers={'Authorization': login_result['Token']}, json=data_json)
            result = resp.json()
        else:
            result = login_result
    except Exception as e:
        result = {'Status':'Failed', 'Message':e}
    finally:
        return result  

def updatePrediction(idgedung,biaya_today,biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas):
    result = {}
    try:
        login_result = login()
        if (login_result['Status'] == 'Success'):
            url = "http://52.76.55.94:3000/api/v1/prediction/edit"
            data_json = {'idgedung':idgedung,'biaya_today':biaya_today,'biaya_week':biaya_week, 'biaya_year':biaya_year, 'jumlah_lampu_avg':jumlah_lampu_avg,'jumlah_kelas':jumlah_kelas}
            resp = requests.put(url, headers={'Authorization': login_result['Token']}, json=data_json)
            result = resp.json()
        else:
            result = login_result
    except Exception as e:
        result = {'Status':'Failed', 'Message':e}
    finally:
        return result    

def getPrediction(idgedung):
    result = {}
    try:
        login_result = login()
        if (login_result['Status'] == 'Success'):
            idgedung = idgedung.replace(" ","+")
            url = "http://52.76.55.94:3000/api/v1/prediction?idgedung=" + idgedung
            resp = requests.get(url, headers={'Authorization': login_result['Token']})
            result = resp.json()
        else:
            result = login_result
    except Exception as e:
        result = {'Status':'Failed', 'Message':e}
    finally:
        return result

def getKelas():
    result = {}
    try:
        login_result = login()
        if (login_result['Status'] == 'Success'):
            url = "http://52.76.55.94:3000/api/v1/kelas/list"
            resp = requests.get(url, headers={'Authorization': login_result['Token']})
            result = resp.json()
        else:
            result = login_result
    except Exception as e:
        result = {'Status':'Failed', 'Message':e}
    finally:
        return result

def getKelasByIdKelas(idkelas):
    result = {}
    try:
        login_result = login()
        if (login_result['Status'] == 'Success'):
            idkelas = idkelas.replace(" ","+")
            url = "http://52.76.55.94:3000/api/v1/kelas/list?idkelas=" + idkelas
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
#print(updatePrediction('TVST',1890000,500000,10000000,54,5))
#print(getPrediction('TVSTA'))
#print(getKelas())
#print(getKelasByIdKelas('7601'))