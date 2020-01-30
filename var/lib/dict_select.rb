
# dict_select.rb

require 'pp'
require 'set'
require 'json'


ks = JSON.parse(File.read(ARGV[0]))
  .collect { |k| k['lit'] }

index = {}

es = JSON.parse(File.read(ARGV[1]))
  .select { |e|
    (e['ks'] || [])
      .map { |k| k['t'] }.join.each_char.find { |c| ks.include?(c) } }

es.each { |e|
  e['ks'].each_with_index { |k, i|
    t = k['t']
    ta = t[0, 1]
    tz = t[-1, 1]
    tm = t[1..-2]
    ks.each { |k|
      r = [ e['seq'], i ]
      r << 'a' if ta == k
      r << 'z' if tz == k
      r << 'm' if tm.index(k)
      (index[k] ||= []) << r if r.length > 2 } } }

seqs = es.each_with_index
  .inject({}) { |h, (e, i)| h[e['seq']] = i; h }
index = index
  .inject({}) { |h, (k, v)|
    h[k] = v.collect { |seq, j, amz| [ seqs[seq], j, amz ] }
    h }
      # "湘"=>[[2827426, 0, "a"], [2828098, 0, "a"]],
      # "猷"=>[[2841688, 0, "z"]],
      # "焰"=>[[2842696, 1, "m"]]}},

r = { index: index, entries: es }

case ARGV[2]
when 'ruby', 'rb', '.rb' then pp(r)
when 'pretty' then puts JSON.pretty_generate(r)
else puts JSON.dump(r)
end

