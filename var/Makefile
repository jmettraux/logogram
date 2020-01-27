
all: dict.json dict.rb kanji.json kanji.rb radkfile.txt

JMdict_e.xml:
	wget http://ftp.monash.edu.au/pub/nihongo/JMdict_e.gz
	gunzip JMdict_e.gz
	mv JMdict_e JMdict_e.xml
dict.json: JMdict_e.xml
	ruby lib/jmdict_to.rb JMdict_e.xml json > dict.json
dict.rb: JMdict_e.xml
	ruby lib/jmdict_to.rb JMdict_e.xml ruby > dict.rb

kanjidic2.xml:
	wget http://www.edrdg.org/kanjidic/kanjidic2.xml.gz
	gunzip kanjidic2.xml.gz
kanji.json: kanjidic2.xml
	ruby lib/kanjidic_to.rb kanjidic2.xml json > kanji.json
kanji.rb: kanjidic2.xml
	ruby lib/kanjidic_to.rb kanjidic2.xml ruby > kanji.rb

radkfile.txt:
	wget http://ftp.monash.edu.au/pub/nihongo/kradzip.zip
	unzip kradzip.zip
	rm kradzip.zip
	rm radkintro* kradintro
	iconv -f EUC-JP -t UTF-8 kradfile2 > kradfile2.txt
	iconv -f EUC-JP -t UTF-8 kradfile > kradfile.txt
	iconv -f EUC-JP -t UTF-8 radkfile > radkfile.txt
	iconv -f EUC-JP -t UTF-8 radkfile2 > radkfile2.txt
	iconv -f EUC-JP -t UTF-8 radkfilex > radkfilex.txt
	rm kradfile2
	rm kradfile
	rm radkfile
	rm radkfile2
	rm radkfilex

clean:
	rm dict.rb
	rm dict.json
	rm kanji.rb
	rm kanji.json
	rm kradfile*.txt
	rm radkfile*.txt

.PHONY: clean

