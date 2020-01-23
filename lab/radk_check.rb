
require 'pp'

def read_radk(path)

  rads = {}
  rad = nil

  File.readlines(path).each do |line|
    s = line[0, 1]
    if s == '#'
      # skip
    elsif s == '$'
      m = line.match(/^\$ (.) (\d+)/)
      rad = [ m[2].to_i ]
      rads[m[1]] = rad
    else
      rad.concat(line.strip.each_char.to_a)
    end
  end

  rads
end

#pp read_radk('var/radkfile2.txt')

rads =
  read_radk('var/radkfile2.txt').keys
#p rads
puts; rads.each { |r| print r }

crads =
  (0x2F00..0x2F00 + 213).collect { |i| i.chr(Encoding::UTF_8) }
#p crads
puts; crads.each { |r| print r }

puts
p rads & crads # no overlap

