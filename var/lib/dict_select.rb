
# dict_select.rb

require 'pp'
require 'set'
require 'json'


ks = JSON.parse(File.read(ARGV[0]))
  .collect { |k| k['lit'] }

index = {}

es = JSON.parse(File.read(ARGV[1]))
  .select { |e|
    keep = false
    (e['ks'] || [])
      .collect { |k| k['t'] }.join
      .each_char { |c|
        next unless ks.include?(c)
        keep = true
        (index[c] ||= Set.new) << e['seq'] }
    keep }

seqs = es.each_with_index
  .inject({}) { |h, (e, i)| h[e['seq']] = i; h }

index = index
  .inject({}) { |h, (k, v)|
    h[k] = v.collect { |seq| seqs[seq] }
    h }

r = { index: index, entries: es }

case ARGV[2]
when 'ruby', 'rb', '.rb' then pp(r)
when 'pretty' then puts JSON.pretty_generate(r)
else puts JSON.dump(r)
end

