
(0x2F00..0x2F00 + 213).each do |i|
  #print "\\u#{i.to_s(16)}"
  #print [ i ].pack('c*')
  print i.chr(Encoding::UTF_8)
end

