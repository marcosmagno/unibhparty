import socket
import sys


class Server(object):
    """docstring for Server"""

    def __init__(self):

        # Create a TCP/IP socket
        sock_server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # Bind the socket to the port
        server_address = ('192.168.0.1', 10000)
        print >>sys.stderr, 'starting up on %s port %s' % server_address
        sock_server.bind(server_address)

        # Listen for incoming connections
        sock_server.listen(1)

        while True:
            # Wait for a connection
            print >>sys.stderr, 'waiting for a connection'
            connection, client_address = sock_server.accept()
            try:
                print >>sys.stderr, 'connection from', client_address

                # Receive the data in small chunks and retransmit it
                data = connection.recv(1024)
                print >>sys.stderr, 'received "%s"' % data
                if data:
                    print >>sys.stderr, 'sending data back to the client'
                else:
                    print >>sys.stderr, 'no more data from', client_address
                    break

            finally:
                # Clean up the connection
                connection.close()


class Client(object):
    """docstring for Client"""

    def __init__(self, data):
        self.data = data

    sock_client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    

def main():
    server = Server()

if __name__ == '__main__':
    main()
