from flask import Flask, request
from flask_cors import CORS, cross_origin
from feature_ext import get_features
from ELM import ELM

app = Flask(__name__)
cors = CORS(app)
model = ELM(18,1,800)

@app.route('/', methods=['GET', 'POST'])
@cross_origin()
def main():
    if request.method == 'GET':
        return 'Server is running!'
    features = request.json
    more_features = get_features(features['url'])
    all_features = {}
    for key in features:
        all_features[key] = features[key]
    for key in more_features:
        all_features[key] = more_features[key]
    #print(all_features)
    #print(all_features.keys())
    columns= ['having_IP_Address', 'URL_Length', 'Shortining_Service',
       'having_At_Symbol', 'double_slash_redirecting', 'Prefix_Suffix',
       'having_Sub_Domain', 'domain_registration', 'Favicon',
       'HTTPS_token', 'Request_URL', 'URL_of_Anchor', 'Links_in_tags', 'SFH',
       'Submitting_to_email', 'on_mouseover', 'Iframe', 'age_of_domain']
    feature_values=[]
    for i in columns:
        feature_values.append(all_features[i])
    print(feature_values)
    result = {"message": model.predict(feature_values)}
    print(result)
    return result
    
if __name__ == '__main__':
    model.prep()
    model.train()
    app.run()
