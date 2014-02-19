TIME="* * * * *"

CWD=$(shell pwd)
NODE_STARTER=storeWeather.sh
BUNYAN=bunyan
CRON_ITEM=$(TIME) $(CWD)/$(NODE_STARTER)

.PHONY: nothing

nothing:
	@echo Nothing to do.
	@echo Try \'make install\'

# http://stackoverflow.com/questions/878600/how-to-create-cronjob-using-bash
crontab:
	@if [ "$(shell crontab -l | grep $(NODE_STARTER) | wc -l)" = "0" ]; then \
		echo "there is no crontab item for "\'$(NODE_STARTER)\' ; \
	else \
		echo "removing crontab item for "\'$(NODE_STARTER)\'; \
		crontab -l | grep -v $(NODE_STARTER) | crontab -; \
	fi;

	@echo "adding crontab item for "\'$(NODE_STARTER)\';
	crontab -l | { cat; echo $(CRON_ITEM); }  | crontab -;

	@echo "your changed crontab"
	@crontab -l

bunyan:
	@# copy './lib/bunyan' to ~/lib/bunyan'
	@if [ ! -d $(HOME)/lib ]; then \
		mkdir -p $(HOME)/lib; \
		cp $(CWD)/lib/$(BUNYAN) $(HOME)/lib/$(BUNYAN); \
	fi;
	@# make a symbolic link to 'node_modules/.bin/bunyan'
	@if [ ! -L $(HOME)/bin/$(BUNYAN) ]; then \
		ln -s $(CWD)/node_modules/.bin/$(BUNYAN) $(HOME)/bin/$(BUNYAN); \
	fi;

sync:
	# rsync ..

install:
	crontab bunyan

