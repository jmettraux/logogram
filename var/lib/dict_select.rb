
# dict_select.rb

require 'pp'
require 'set'
require 'json'


ks = JSON.parse(File.read(ARGV[0]))
  .collect { |k| k['lit'] }

es = JSON.parse(File.read(ARGV[1]))
  .select { |e|
    (e['ks'] || [])
      .map { |k| k['t'] }.join.each_char.find { |c| ks.include?(c) } }


case ARGV[2]
when 'ruby', 'rb', '.rb' then pp(es)
when 'pretty' then puts JSON.pretty_generate(es)
else puts JSON.dump(es)
end

