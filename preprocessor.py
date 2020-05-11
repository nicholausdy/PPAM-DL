import api

def listGedung():
    result = []
    api_result = api.getAllGedung()
    if (api_result['Status'] == 'Success'):
        for i in range(len(api_result['Message'])):
            result.append(api_result['Message'][i]['idgedung'])
    return result

def listUniqueClass(idgedung):
    result = []
    api_result = api.getStatisticbyIdGedung(idgedung)
    if (api_result['Status'] == 'Success'):
        for i in range(len(api_result['Message'])):
            if api_result['Message'][i]['idkelas'] not in result:
               result.append(api_result['Message'][i]['idkelas'])
    return result,api_result

#create independent time series for each class
def createTimeSeries(idgedung):
    result = []
    unique_class,api_result = listUniqueClass(idgedung)
    if not result: #check if list empty or not
        for i in range(len(unique_class)):
            sublist = []
            for j in range(len(api_result['Message'])):
                if (unique_class[i] == api_result['Message'][j]['idkelas']):
                    sublist.append(api_result['Message'][j]['lampumenyala'])
            result.append(sublist)
    return result

#print(listGedung())
#print(listUniqueClass('Labtek VI'))
#a = createTimeSeries('Labtek VI')
#print(a)
#print(len(a[0]))        