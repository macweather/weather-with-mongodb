#!/bin/bash

#
# storeWeatherdata
# Copyright(c) 2013 Uli Fuchs <ufuchs@gmx.com>
# MIT Licensed
#
# [ The true sign of intelligence is not knowledge but imagination. ]
# [                                             - Albert Einstein - ]
#

# This is indented to run at the end of each day to get the true min, max values

#
# Dependencies
#

. $(/bin/pwd)/lib/bunyan

__bunyanSetLevel "info"

info "service starts" >> $HOME/log.txt

echo "-->" >> $HOME/log.txt

/usr/local/bin/node $HOME/weather/index.js >> $HOME/log.txt

echo "<--" >> $HOME/log.txt

info "service ends" >> $HOME/log.txt

info "shutting down maschine" >> $HOME/log.txt
