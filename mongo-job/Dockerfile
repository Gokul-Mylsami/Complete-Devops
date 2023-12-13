FROM mongo:4.0.8
RUN mkdir -p /scripts
WORKDIR /scripts
COPY ./script.sh ./script.sh
RUN chmod +x ./script.sh
CMD ["./script.sh"]