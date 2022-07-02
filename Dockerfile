FROM mafgwo/wkhtmltopdf-nodejs:11.15.0

RUN mkdir -p /opt/stackedit
WORKDIR /opt/stackedit

COPY package*json /opt/stackedit/
COPY gulpfile.js /opt/stackedit/

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN git config --global http.sslVerify false && npm set strict-ssl false && npm install --unsafe-perm \
  && npm cache clean --force
COPY . /opt/stackedit
ENV NODE_ENV production
RUN npm run build

EXPOSE 8080

CMD [ "node", "." ]
