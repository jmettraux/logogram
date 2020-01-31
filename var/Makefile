
all: dict.json dict.rb kanji.json kanji.rb radkfile.txt


kanjidic2.xml:
	wget http://www.edrdg.org/kanjidic/kanjidic2.xml.gz
	gunzip kanjidic2.xml.gz
full_kanji.json: kanjidic2.xml
	ruby lib/kanjidic_to.rb $^ json > $@
full_kanji.rb: kanjidic2.xml
	ruby lib/kanjidic_to.rb $^ ruby > $@
select_kanji.json: full_kanji.json
	ruby lib/kanji_select.rb $^ json > $@
select_kanji.rb: full_kanji.json
	ruby lib/kanji_select.rb $^ ruby > $@
kanji.json: select_kanji.json
	ruby lib/kanji_index.rb $^ json > $@
kanji.rb: select_kanji.json
	ruby lib/kanji_index.rb $^ ruby > $@

JMdict_e.xml:
	wget http://ftp.monash.edu.au/pub/nihongo/JMdict_e.gz
	gunzip JMdict_e.gz
	mv JMdict_e $@
full_dict.json: JMdict_e.xml
	ruby lib/jmdict_to.rb $^ json > $@
full_dict.rb: JMdict_e.xml
	ruby lib/jmdict_to.rb $^ ruby > $@
select_dict.json: select_kanji.json full_dict.json
	ruby lib/dict_select.rb $^ json > $@
select_dict.rb: select_kanji.json full_dict.json
	ruby lib/dict_select.rb $^ ruby > $@
dict.json: select_kanji.json select_dict.json
	ruby lib/dict_index.rb $^ json > $@
dict.rb: select_kanji.json select_dict.json
	ruby lib/dict_index.rb $^ ruby > $@

kradzip.zip:
	wget http://ftp.monash.edu.au/pub/nihongo/kradzip.zip
	mkdir tmp
	cd tmp && unzip ../kradzip.zip
kradfile2.txt: kradzip.zip
	iconv -f EUC-JP -t UTF-8 tmp/kradfile2 > $@
kradfile.txt: kradzip.zip
	iconv -f EUC-JP -t UTF-8 tmp/kradfile > $@
radkfile.txt: kradzip.zip
	iconv -f EUC-JP -t UTF-8 tmp/radkfile > $@
radkfile2.txt: kradzip.zip
	iconv -f EUC-JP -t UTF-8 tmp/radkfile2 > $@
radkfilex.txt: kradzip.zip
	iconv -f EUC-JP -t UTF-8 tmp/radkfilex > $@

clean:
	rm -f dict.rb
	rm -f dict.json
	rm -f kanji.rb
	rm -f kanji.json
	rm -f *_kanji.rb
	rm -f *_kanji.json
	rm -f kradfile*.txt
	rm -f radkfile*.txt

.PHONY: clean

