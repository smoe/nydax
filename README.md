
NYDAX  - Digital Asset Trading Platform and Exchange, open source crypto currency exchange


![NYDAX Dashboard](/images/NYDAX5.png)

NYDAX is an Enterprise grade Digital Asset Exchange Platform, Originally developed under a project called Innovation Netwrok and then used to power NYDAX Digital Asset Exchange, We have decided to make the source code avaiable to public so that other users can benefit from it, Code is been provided as it is and we are not suggesting to use this code for production environment, however it gives you a good base to start with. If you want service support on this code please contact us through hello at nydax.com

How to run this project :

- The setup script is assuming you are on Ubuntu 18.04 so you can setup an AWS instance , minimum 4 Gig ram and 10 gig disk space is needed, make sure ports 2083, 2053 ,3000 are open.

1- clone this repository

2- Run install script

`nydax/bin/./install.sh`

3- Run run script `nydax>bin/./start.sh`

Open Your browser and browse http://IP:3000

Enjoy.


![NYDAX Dashboard](/images/NYDAX13.png)

Basic functionalities:
- User registration
- User KYC
- Dashboard
- Drag and Drop on the UI commponents for Trading Platform
- NodeJS / React JS based application 
- MySQL as Database
- RabbitMQ for Messaging 
- Has API Layer for real time trading 
- Supports long decimals
- Multi Layout / Drag and Drop
- Multi Theme ( White,  Dark , Black out of the box ) 
- Supports SMS Notifications ( Twillio ) 
- Supports Email Notifications 
- Supports Fiat Payments (Stripe)
- Perfect for Crypto Currency Trading Platforms and Exchanges 

for more information on help and support, please email us hello@nydax.com





Detail configuration settings:

To get the exchange working properly , you need to update elements below marked as #updateMe

```

export PLATFORM_NAME=IXP
export FIP=`dig +short myip.opendns.com @resolver1.opendns.com`
export BIP=$FIP
export FED_HOST=http://$FIP
export API_GATEWAY_HOST=http://$BIP:2083
export BED_HOST=http://$BIP:2083
export WEBSOCKET_HOST=http://$BIP:2053
export FED_PORT=80
export API_GATEWAY_PORT=2083
export BED_PORT=2083
export WEBSOCKET_PORT=2053
export ETH_HOST=http://localhost:4040
export ETH_PORT=4040
export BTC_HOST=http://localhost:5050
export ENVIRONMENT=development
export HTTP_PORT=3000
export HTTPS_PORT=443

##Deploy DB
#export DB_HOST=localhost
export DB_PORT=3306
export DB_NAME=nydax
export DB_USER=nydax_user
export DB_USER=dba
export DB_PASS=#UpateMe


## RabbitMQ Queues
export RABBITMQ_CONNECTION_URL=amqp://localhost/
export NEW_ORDER_QUEUE_NAME=order
export SELL_ORDER_QUEUE_NAME=sell_order
export BUY_ORDER_QUEUE_NAME=buy_order
export MATCHED_ORDER_QUEUE_NAME=matched_order
export CANCEL_ORDER_QUEUE_NAME=cancel_order
export CANCEL_RESPONSE_QUEUE_NAME=cancel_response
export STAT_FOR_MM_QUEUE_NAME=stat_for_mm
export ORDERBOOK_QUEUE_NAME=orderbook
export PRICE_QUEUE_NAME=price
export CURRENCY_QUEUE_NAME=currency
export CURRENCY_SOCKET_QUEUE_NAME=currency_socket
export DB_ACTIONS_QUEUE_NAME=db_actions


## Algo Paarameters
export SEND_STAT_INTERVAL=15
export MIN_VOL_FOR_ONLY_IXP_ISUUED_TOKEN=1000
export PERCENTAGE_IN_EACH_PERIOD=0.005
export MM_USER_ID=1
export TRX_FEE_USER_ID=2
export INCRESE_PERCENTAGE=0.04

## API
export CURRENCIES_RATIO_API_URL=https://api.ratesapi.io/api/latest?base=USD
export PRICE_RATIO_API_URL=https://min-api.cryptocompare.com/data/price
export PRICE_RATIO_API_KEY=#updateMe


#Stripe payment keys
export STRIPE_API_KEY=#UpdateMe
export STRIPE_SECRET_KEY=#UpdateMe

#Captcha keys
export RE_CAPTCHA=#updateMe

#twilioService
export AUTH_TOKEN=#updateMe
export ACCOUNT_SID=#updateMe
export PHONE_NUMBER=#updateMe

#nodemailer
export NODEMAILER_HOST=#updateMe
export NODEMAILER_PORT=#updateMe
export NODEMAILER_USER=neply@nydax.com
export NODEMAILER_PASS=#updateMe



```

if you have any question, please join telegram discussion group   https://t.me/nydax



Here are some screenshots of the running NYDAX , if you are succefull in your deployment you should be seeing this :

![NYDAX Screenshot](/images/NYDAX1.png)

![NYDAX Screenshot](/images/NYDAX2.png)

![NYDAX Screenshot](/images/NYDAX3.png)

![NYDAX Screenshot](/images/NYDAX4.png)

![NYDAX Screenshot](/images/NYDAX5.png)
![NYDAX Screenshot](/images/NYDAX6.png)
![NYDAX Screenshot](/images/NYDAX7.png)
![NYDAX Screenshot](/images/NYDAX8.png)
![NYDAX Screenshot](/images/NYDAX9.png)
![NYDAX Screenshot](/images/NYDAX10.png)
![NYDAX Screenshot](/images/NYDAX11.png)
![NYDAX Screenshot](/images/NYDAX12.png)
![NYDAX Screenshot](/images/NYDAX13.png)
>Token Info Page
![NYDAX Screenshot](/images/NYDAX14.png)

