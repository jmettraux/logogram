
def hiragana?(s)
  !!s.match(/^\p{Hiragana}+$/)
end
def katakana?(s)
  !!s.match(/^\p{Katakana}+$/)
end

p hiragana?("やま")
p katakana?("やま")
p hiragana?("yama")
p katakana?("yama")
p hiragana?("ヤマ")
p katakana?("ヤマ")
p hiragana?("山")
p katakana?("山")

