
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
      r << 'a' if ta == lit
      r << 'z' if tz == lit
      r << 'm' if tm.index(lit)
      (by_kanji[lit] ||= []) << r if r.length > 2 } } }

seqs = es.each_with_index
  .inject({}) { |h, (e, i)|
    h[e['seq']] = i
    h }

by_kanji = by_kanji
  .inject({}) { |h, (k, v)| h[k] = v.map { |seq, *z| [ seqs[seq], *z ] }; h }


r = { items: es, index: { by_kanji: by_kanji } }


case ARGV[2]
when 'ruby', 'rb', '.rb' then pp(r)
when 'pretty' then puts JSON.pretty_generate(r)
else puts JSON.dump(r)
end

