VeXML
=====

MusicXML display using VexFlow

About
-----

VeXML represents MusicXML in JavaScript and will eventually allow VexFlow
to engrave music using MusicXML input.

Using
-----

Make sure you are using the correct branch of VexFlow, which may have extra
features required by VeXML:

    $ git clone git://github.com/ringw/vexflow
    $ cd vexflow
    $ git checkout vexml
    $ git submodule init
    $ git submodule update

"vexml" will be created as a subdirectory of "vexflow". The tests in
"vexml/tests/musicxml.html" will work right away. Next, build VexFlow and VeXML
using "scons" in the vexflow directory. Then try "vexml/tests/viewer.html".

After building, you can find a standalone demo of VeXML as
"build/vexflow-musicxml-free.zip". You can unzip this and open "viewer-ajax.html"
in a supported browser (Google Chrome does not support file:// AJAX requests)
or unzip the contents on an HTTP server. You can test with the following examples
or add other XML files in the same directory:

* viewer-ajax.html?doc=bach_bwv846p.xml
* viewer-ajax.html?doc=chopin_prelude_4.xml
* viewer-ajax.html?doc=faure_apres_un_reve.xml
* viewer-ajax.html?doc=joplin_maple_leaf_rag.xml

Classes
-------

This the hierarchy of classes VeXML uses to represent MusicXML.

* __Document__

  The highest-level class, which represents a complete MusicXML document.

* __StaffSystem__

  Draws a system (the group of staves from each part), laying out VexFlow
  Staves and drawing a bracket.

* __Part__

  An entire MusicXML part, which can contain multiple staffs (e.g. keyboard),
  and/or voices.

* __Measure__

  One measure in one part. The notes may span multiple PartStaffs and/or Voices.
  By accessing one Measure of a PartStaff or Voice, a new Measure is dynamically
  created containing only the notes in that PartStaff or Voice.

* __PartStaff__

  One staff in a part. MusicXML allows voices to use multiple staffs, but
  this may not currently be possible with VexFlow. A staff element does not
  exist in MusicXML; this object represents all notes in a part or measure with the
  same "staff" attribute.

* __Voice__

  One voice in a part. A voice element does not exist in MusicXML; this object
  represents all notes in a part, staff, or measure with the same "voice" attribute.

* __Note__ / __Chord__

  A Note represents a single note element, and a Chord represents a group of
  note elements which are a single chord.
