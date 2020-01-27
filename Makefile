
all: public/site.js public/site.css public/data.js

public/site.js: scripts/*.js
	cd scripts && cat `cat _order.txt` > ../public/site.js

public/site.css: sheets/*.css
	cd sheets && cat `cat _order.txt` > ../public/site.css

public/data.js: var/kanji.json
	echo 'window.lgdata = {};' > public/data.js
	echo 'window.lgdata.kanji = ' >> public/data.js
	cat var/kanji.json >> public/data.js
	echo ';' >> public/data.js

touch:
	touch scripts/*.js
	touch sheets/*.css
	touch var/*.json
force: touch all
f: force

var/JMdict_e.xml:
	wget http://ftp.monash.edu.au/pub/nihongo/JMdict_e.gz
	gunzip JMdict_e.gz
	mv JMdict_e var/JMdict_e.xml
var/dict.json: var/JMdict_e.xml
	ruby var/lib/jmdict_to.rb var/JMdict_e.xml json > var/dict.json
var/dict.rb: var/JMdict_e.xml
	ruby var/lib/jmdict_to.rb var/JMdict_e.xml ruby > var/dict.rb

var/kanjidic2.xml:
	wget http://www.edrdg.org/kanjidic/kanjidic2.xml.gz
	gunzip kanjidic2.xml.gz
	mv kanjidic2.xml var/
var/kanji.json: var/kanjidic2.xml
	ruby var/lib/kanjidic_to.rb var/kanjidic2.xml json > var/kanji.json
var/kanji.rb: var/kanjidic2.xml
	ruby var/lib/kanjidic_to.rb var/kanjidic2.xml ruby > var/kanji.rb

var/radkfile.txt:
	cd var/ && wget http://ftp.monash.edu.au/pub/nihongo/kradzip.zip
	cd var/ && unzip kradzip.zip
	cd var/ && rm kradzip.zip
	cd var/ && rm radkintro* kradintro
	cd var/ && iconv -f EUC-JP -t UTF-8 kradfile2 > kradfile2.txt
	cd var/ && iconv -f EUC-JP -t UTF-8 kradfile > kradfile.txt
	cd var/ && iconv -f EUC-JP -t UTF-8 radkfile > radkfile.txt
	cd var/ && iconv -f EUC-JP -t UTF-8 radkfile2 > radkfile2.txt
	cd var/ && iconv -f EUC-JP -t UTF-8 radkfilex > radkfilex.txt
	cd var/ && rm kradfile2
	cd var/ && rm kradfile
	cd var/ && rm radkfile
	cd var/ && rm radkfile2
	cd var/ && rm radkfilex

serve:
	ruby -run -ehttpd public/ -p8000
s: serve

.PHONY: serve

