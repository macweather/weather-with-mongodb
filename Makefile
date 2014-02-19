TIME="10 0 * * *"

CWD=$(shell pwd)
NODE_STARTER=storeWeather.sh
CRON_ITEM=$(TIME) $(CWD)/$(NODE_STARTER)

crontab :
	@if [ "$(shell . ./lib/bunyan; crontab -l | grep $(NODE_STARTER) | wc -l)" = "0" ]; then \
		echo "missing crontab item for "\'$(NODE_STARTER)\' ; \
	else \
		echo "removing crontab item for "\'$(NODE_STARTER)\'; \
		crontab -l | grep -v $(NODE_STARTER) | crontab -; \
	fi;

	@echo "adding crontab item for "\'$(NODE_STARTER)\'; 
	crontab -l | { cat; echo $(CRON_ITEM); }  | crontab -;

	@echo "your changed crontab"
	@crontab -l
