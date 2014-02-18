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

. lib/bunyan

__bunyanSetLevel "info"
info "service starts"


info "service ends"

info "shutting down maschine"
