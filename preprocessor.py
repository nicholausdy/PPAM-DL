import api

list_kelas = api.getKelas()

def listGedung():
    result = []
    api_result = api.getAllGedung()
    if (api_result['Status'] == 'Success'):
        for i in range(len(api_result['Message'])):
            result.append(api_result['Message'][i]['idgedung'])
    return result

def listUniqueClass(idgedung):
    result = []
    count_kelas = 0
    api_result = api.getStatisticbyIdGedung(idgedung)
    if (api_result['Status'] == 'Success'):
        for i in range(len(api_result['Message'])):
            if api_result['Message'][i]['idkelas'] not in result:
               result.append(api_result['Message'][i]['idkelas'])
    if result:
        for i in range(len(result)):
            count_kelas+=1
    return result,api_result,count_kelas

#create independent time series for each class
def createTimeSeries(idgedung):
    result = []
    unique_class,api_result, count_kelas = listUniqueClass(idgedung)
    if unique_class: #check if list is not empty
        for i in range(len(unique_class)):
            sublist = []
            for j in range(len(api_result['Message'])):
                if (unique_class[i] == api_result['Message'][j]['idkelas']):
                    sublist.append(api_result['Message'][j]['lampumenyala'])
            result.append(sublist)
    return result

def createUnifiedListKelas():
    result = []
    gedung_result = listGedung()
    if gedung_result: #check if list is not empty
        for i in range(len(gedung_result)):
            unique_class,api_result, count_kelas = listUniqueClass(gedung_result[i])
            result.append(unique_class)
    return result,gedung_result

def createUnifiedTimeSeries():
    result = []
    gedung_result = listGedung()
    if gedung_result: #check if list is not empty
        for i in range(len(gedung_result)):
            result.append(createTimeSeries(gedung_result[i]))
    return result,gedung_result

def createUnifiedTimeSeriesDict():
    list_time_series,gedung_result = createUnifiedTimeSeries()
    if list_time_series:  #check if list is not empty
        zipped_list = zip(gedung_result,list_time_series,) #return paired
        result = dict(zipped_list)
    else:
        result = {}
    return result

def createUnifiedListKelasDict():
    list_kelas,gedung_result = createUnifiedListKelas()
    if list_kelas:  #check if list is not empty
        zipped_list = zip(gedung_result,list_kelas) #return paired
        result = dict(zipped_list)
    else:
        result = {}
    return result

def jumlahLampuPerGedung(idgedung):
    lampu_per_gedung = 0
    if (list_kelas['Status'] == 'Success'):
        for i in range(len(list_kelas['Message'])):
            if (list_kelas['Message'][i]['idgedung'] == idgedung):
                lampu_per_gedung += list_kelas['Message'][i]['jumlahlampu']
    return lampu_per_gedung

def jumlahLampuByIdKelas(idkelas):
    result = 0
    query_result = api.getKelasByIdKelas(idkelas)
    if (query_result['Status'] == 'Success'):
        result = query_result['Message']['jumlahlampu']
    return result

def createUnifiedJumlahLampuDict():
    dict_kelas = createUnifiedListKelasDict()
    for key in dict_kelas:
        if dict_kelas[key]:
            for i in range(len(dict_kelas[key])):
                dict_kelas[key][i] = jumlahLampuByIdKelas(dict_kelas[key][i])
    return dict_kelas


#print(listGedung())
#print(listUniqueClass('Labtek VII'))
#a = createTimeSeries('Labtek VII')
#print(a)
#print(len(a[0]))     
#print(createUnifiedTimeSeries())   
#print(createUnifiedTimeSeriesDict())
#print(jumlahLampuByIdKelas('TVST-A'))

#print(createUnifiedListKelasDict())
#print(createUnifiedJumlahLampuDict())
#print(jumlahLampuByIdKelas(dict_kelas['Labtek V'][0]))

#print(jumlahLampuPerGedung('Labtek X'))