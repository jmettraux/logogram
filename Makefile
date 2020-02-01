
all: public/site.js public/site.css public/data.js


public/site.js: scripts/*.js
	cd scripts/ && cat `cat _order.txt` > ../$@

public/site.css: sheets/*.css
	cd sheets/ && cat `cat _order.txt` > ../$@

public/data.js: var/kanji.json var/dict.json
	echo 'window.lgdata = {};' > $@
	echo 'window.lgdata.kanji = ' >> $@
	cat var/kanji.json >> $@
	echo ';' >> $@
	echo 'window.lgdata.dict = ' >> $@
	cat var/dict.json >> $@
	echo ';' >> $@

var/kanji.json:
	cd var/ && make kanji.json
var/dict.json:
	cd var/ && make dict.json


serve:
	ruby -run -ehttpd public/ -p8000
s: serve


.PHONY: serve

