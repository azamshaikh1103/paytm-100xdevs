FROM mongo:4.4.7
RUN echo "rs.initiate();" > /docker-entrypoint-initdb.d/replica-init.js
CMD ["mongod", "--replSet", "rs0", "--bind_ip_all"]
