from pymongo import MongoClient
cliente = MongoClient('mongodb://localhost:27017/')
banco = cliente.unibhparty
persona = banco.unibhparty_collection

#set_persona =  {
#	        "ID": "att1234560", 
#	        "activated": "2015-11-20", 
#	        "added": "2015-11-21", 
#	        "lat": -19.503148, 
#	        "lng": -43.40178, 
#	        "logadour": "Ru algumas", 
#	        "type": "AT&T"
#	    }
#musica_id = persona.insert_one(set_persona)
print persona.find_one()