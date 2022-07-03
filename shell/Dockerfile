FROM ubuntu

WORKDIR /projects
RUN apt-get update -y
RUN apt-get install gcc -y
RUN apt-get install g++ -y
RUN apt-get install default-jdk -y
RUN apt-get install python-is-python3 -y
RUN apt-get install nodejs -y

ENTRYPOINT sleep infinity 
# ENTRYPOINT [ "sh", "tail -f /dev/null" ]
# ENTRYPOINT ["tail","-f", "/dev/null"]
# CMD ["tail", "-f", "/dev/null"]