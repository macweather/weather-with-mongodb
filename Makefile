
install:
	ln -s $(shell pwd)/node_modules/.bin/bunyan $(HOME)/bin/bunyan >/dev/null 2>&1
	ln -s $(shell pwd)/storeWeather.sh $(HOME)/bin/storeWeather.sh >/dev/null 2>&1
