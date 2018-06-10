import socket
import json
HOST = '192.168.0.1'     # Endereco IP do Servidor
PORT = 10000            # Porta que o Servidor esta
tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
dest = (HOST, PORT)
tcp.connect(dest)
print 'Para sair use CTRL+X\n'


data = {
      "logadour":"Ru algumas",
      "lat": -19.503148,
      "lng": -43.40178,
      "ID": "att1234560",
      "type": "AT&T",
      "activated": "2015-11-20",
      "added": "2015-11-21",
},


s = json.dumps(data)
with open('persona1.json', 'a') as outfile:
     json.dump(data, outfile, sort_keys = True, indent = 4,
               ensure_ascii = False)

tcp.send(s)    


tcp.close()
