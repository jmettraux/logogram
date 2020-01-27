
# kanji_select.rb

require 'pp'
require 'json'


ks =
  JSON.parse(File.read(ARGV[0]))
    .select { |k| k['grd'] || k['jlpt'] || k['frq'] }

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(ks)
when 'pretty' then puts JSON.pretty_generate(ks)
else puts JSON.dump(ks)
end

