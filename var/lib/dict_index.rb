
# dict_index.rb

require 'pp'
require 'set'
require 'json'


lits = JSON.parse(File.read(ARGV[0]))
  .collect { |k| k['lit'] }

by_kanji = {}

es = JSON.parse(File.read(ARGV[1]))

es.each { |e|
  e['ks'].each_with_index { |k, i|
    t = k['t']
    ta = t[0, 1]
    tz = t[-1, 1]
    tm = t[1..-2]
    lits.each { |lit|
      r = [ e['seq'], i ]
      ((by_kanji[lit] ||= {})[:a] ||= []) << r if ta == lit
      ((by_kanji[lit] ||= {})[:z] ||= []) << r if tz == lit
      ((by_kanji[lit] ||= {})[:m] ||= []) << r if tm.index(lit) } } }

seqs = es.each_with_index
  .inject({}) { |h, (e, i)|
    h[e['seq']] = i
    h }

by_kanji
  .each { |_, azm|
    azm.each { |_, a|
      a.each { |si|
#si << "XXX" unless seqs[si[0]]
#p [ seqs[si[0]], '<--', si ]
        si[0] = seqs[si[0]]
} } }


r = { items: es, index: { by_kanji: by_kanji } }


case ARGV[2]
when 'ruby', 'rb', '.rb' then pp(r)
when 'pretty' then puts JSON.pretty_generate(r)
else puts JSON.dump(r)
end

