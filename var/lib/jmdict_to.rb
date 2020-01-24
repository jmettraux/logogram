
require 'pp'
require 'json'
require 'rexml/document'
require 'rexml/streamlistener'


class DictListener

  include REXML::StreamListener

  attr_reader :entries

  def initialize
    super
    @tag_stack = []
    @entries = []
  end

  def tag_start(*args)
    @tag_stack << args
    m = "on_#{args.first}_start"
    send(m, *args) if respond_to?(m, true)
  end
  def text(t)
    return if @tag_stack.empty?
    m = "on_#{@tag_stack.last.first}_text"
    send(m, t) if respond_to?(m, true)
  end
  def tag_end(*args)
    @tag_stack.pop
    m = "on_#{args.first}_end"
    send(m, *args) if respond_to?(m, true)
  end

  protected

  def tag_name; @tag_stack.last[0]; end
  def tag; @tag_stack.last[1]; end

  def entry; @entries.last; end

  #def narrow(t); t.match(/^\d+$/) ? t.to_i : t; end
  def de_entitize(t); m = t.match(/^&([^;]+);$/); m ? m[1] : t; end

  def on_entry_start(*args)
    @entries << {}
#  def on_entry_end(*args)
#    return if entry[:seq] < 1001000
#puts ">" * 80
#pp @entries
#exit 0
#  end
  end
  def on_ent_seq_text(t)
    entry[:seq] = t.to_i
  end
  def on_keb_text(t)
    (entry[:ks] ||= []) << { t: t }
  end
  def on_ke_inf_text(t)
    (entry[:ks].last[:infs] ||= []) << de_entitize(t)
  end
  def on_ke_pri_text(t)
    (entry[:ks].last[:pris] ||= []) << t
  end
  def on_reb_text(t)
    (entry[:rs] ||= []) << { t: t }
  end
  def on_re_nokanji_text(t)
    t = t.strip; t = t == '' ? true : t
    entry[:rs].last[:nokanji] = t
  end
  def on_re_inf_text(t)
    (entry[:rs].last[:infs] ||= []) << de_entitize(t)
  end
  def on_re_pri_text(t)
    (entry[:rs].last[:pris] ||= []) << t
  end
  def on_re_restr_text(t)
    (entry[:rs].last[:restrs] ||= []) << t
  end

  def sense; entry[:senses].last; end

  def on_sense_start(*args)
    (entry[:senses] ||= []) << {}
  end
  def on_stagk_text(t)
    (sense[:stagks] ||= []) << t
  end
  def on_stagr_text(t)
    (sense[:stagrs] ||= []) << t
  end
  def on_pos_text(t)
    (sense[:poses] ||= []) << de_entitize(t)
  end
  def on_xref_text(t)
    (sense[:xrefs] ||= []) << t
  end
  def on_ant_text(t)
    (sense[:ants] ||= []) << t
  end
  def on_field_text(t)
    (sense[:fields] ||= []) << de_entitize(t)
  end
  def on_misc_text(t)
    (sense[:miscs] ||= []) << de_entitize(t)
  end
  def on_s_inf_text(t)
    (sense[:s_infs] ||= []) << t
  end
  def on_dial_text(t)
    (sense[:dials] ||= []) << de_entitize(t)
  end
  def on_lsource_text(t)
    v = { t: t }
    a = tag['xml:lang']; v[:lang] = a if a
    a = tag['ls_type']; v[:type] = a if a
    a = tag['ls_wasei']; v[:wasei] = a if a
    (sense[:lsources] ||= []) << v
  end
  def on_gloss_text(t)
    v = { t: t }
    a = tag['xml:lang']; v[:lang] = a if a
    a = tag['g_end']; v[:end] = a if a
    a = tag['g_type']; v[:type] = a if a
    (sense[:glosses] ||= []) << v
  end
end


l = DictListener.new

REXML::Document.parse_stream(File.new(ARGV[0]), l)

case ARGV[1]
when 'ruby', 'rb', '.rb' then pp(l.entries)
when 'pretty' then puts JSON.pretty_generate(l.entries)
else puts JSON.dump(l.entries)
end

