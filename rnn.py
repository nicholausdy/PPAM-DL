import api
import preprocessor
import math
from numpy import array
from keras.models import Sequential
from keras.layers import LSTM
from keras.layers import Dense
from keras.layers import Bidirectional
#define rnn model
#Reference : https://machinelearningmastery.com/how-to-develop-lstm-models-for-time-series-forecasting/
n_steps = 3
n_features = 1
raw_dict = preprocessor.createUnifiedTimeSeriesDict()
list_lampu_dict = preprocessor.createUnifiedJumlahLampuDict()

model = Sequential()
model.add(Bidirectional(LSTM(50, activation='relu'), input_shape=(n_steps,n_features)))
model.add(Dense(1))
model.compile(optimizer='adam', loss='mse')

#split a univariate sequence
def split_sequence(sequence): #create training batch
    X, y = [], []
    for i in range(len(sequence)):
        #find end of pattern
        end_ix = i + n_steps
        #check if we are beyond the sequence
        if end_ix > len(sequence)-1:
            break
        # gather input and output parts of pattern
        seq_x, seq_y = sequence[i:end_ix], sequence[end_ix]
        X.append(seq_x)
        y.append(seq_y)
    return array(X), array(y)

# train model on a single univariate sequence
def train_one_sequence(sequence):
    X, y = split_sequence(sequence)
    X = X.reshape((X.shape[0], X.shape[1], n_features))
    model.fit(X,y,epochs=150, verbose=1)

def train_on_object():
    #print(raw_dict)
    for key in raw_dict:
        if raw_dict[key]: #check if value is not empty list
            for i in range(len(raw_dict[key])):
                train_one_sequence(raw_dict[key][i])

#calculate average usage lampu per day berdasarkan sejarah
def calculatePriceLampuToday(idgedung):
    total_rata_lampu = 0
    price = 0
    count_kelas = 0
    if raw_dict[idgedung]:
        for i in range(len(raw_dict[idgedung])):
            count = 0
            sum = 0
            #hitung average per kelas
            for j in range(len(raw_dict[idgedung][i])):
                count+=1
                sum+=raw_dict[idgedung][i][j]
            total_rata_lampu += math.ceil(sum/count)
            count_kelas += 1
        price = math.ceil(total_rata_lampu * 0.015 * 11 * 1467)
    return total_rata_lampu,price,count_kelas 

#prediction for one building (days = 7 (next week), days = 30 (next month), days = 365 (next year))
def prediction(idgedung,days):
    result = []
    if raw_dict[idgedung]:
        for i in range(len(raw_dict[idgedung])):
            input_pred = raw_dict[idgedung][i][-3:]
            sublist = []
            for j in range(days):
                input_pred = input_pred[-3:]
                x_input = array(input_pred)
                x_input = x_input.reshape(1, n_steps, n_features)
                yhat = model.predict(x_input, verbose=0)
                yhat_num = math.ceil(yhat.tolist()[0][0])
                maks_num_lampu = list_lampu_dict[idgedung][i]
                if (yhat_num > maks_num_lampu):
                    yhat_num = maks_num_lampu
                input_pred.append(yhat_num)
                print(input_pred)
                sublist.append(yhat_num)
            result.append(sublist)
    return result

def calculatePriceLampuPrediction(idgedung,days):
    pred_result = prediction(idgedung,days)
    total_rata_lampu = 0
    price = 0
    count_kelas = 0
    if pred_result:
        for i in range(len(pred_result)):
            count = 0
            sum = 0
            #hitung average per kelas
            for j in range(len(pred_result[i])):
                count+=1
                sum+=pred_result[i][j]
            total_rata_lampu += math.ceil(sum/count)
            count_kelas += 1
        #maks_lampu = preprocessor.jumlahLampuPerGedung(idgedung)
        #if (total_rata_lampu > maks_lampu ):
        #    total_rata_lampu = maks_lampu
        price = math.ceil(total_rata_lampu * 0.015 * 11 * 1467) * days
    return pred_result,total_rata_lampu,price,count_kelas 

def addHandler(idgedung,biaya_today,biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas):
    existing_pred = api.getPrediction(idgedung)
    result = {}
    # if success update existing pred, if not success update existing pred if failure caused by empty record
    if (existing_pred['Status'] == 'Success'):
        result = api.updatePrediction(idgedung,biaya_today,biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas)
    else :
        if (existing_pred['Message'] == 'Record empty'):
            result = api.insertPrediction(idgedung,biaya_today,biaya_week, biaya_year, jumlah_lampu_avg, jumlah_kelas)
        else:
            result = existing_pred
    print(result)
    return result

#run prediction and training in single routine
def main():
    train_on_object()
    for key in raw_dict:
        total_rata_lampu_today,price_today,count_kelas = calculatePriceLampuToday(key)
        pred_result_week,total_rata_lampu,price_week,count_kelas = calculatePriceLampuPrediction(key,7)
        pred_result_month,total_rata_lampu,price_month,count_kelas = calculatePriceLampuPrediction(key,30)
        pred_result_year,total_rata_lampu,price_year,count_kelas = calculatePriceLampuPrediction(key,365)
        insert_result = addHandler(key,price_today,price_week,price_year,total_rata_lampu,count_kelas)
        print(insert_result)

main()

#main function
    #train_on_object()
    #print(calculatePriceLampuPrediction('Labtek V',7))

#x_input = array([11, 12, 12])
#x_input = x_input.reshape((1, n_steps, n_features))
#yhat = model.predict(x_input, verbose=0)
#print(yhat)

#print(calculatePriceLampuToday('Labtek V'))
#print(addHandler('Labtek III',1720000,650000,10000000,54,15))

#print(raw_dict)