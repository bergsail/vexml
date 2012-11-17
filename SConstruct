"""
VexFlow / VeXML Build Script
Requires: SCons, Git, and Google Closure Compiler
"""

from vexflow_scons import *

vexml_sources = [
      "src/header.js",
      "src/base.js",
      "src/element.js",
      "src/document.js",
      "src/part.js",
      "src/attributes.js",
      "src/measure.js",
      "src/voice.js",
      "src/partstaff.js",
      "src/note.js",
      "src/chord.js",
      "src/staffsystem.js"
    ]

Import("dbg opt")

vexml_dbg = dbg.Clone(JS_DEFINES = {})
vexml_opt = opt.Clone(JS_DEFINES = {})

build_and_stamp("vexflow-musicxml-dbg.js", vexml_sources, vexml_dbg)
build_and_stamp("vexflow-musicxml-free.js", vexml_sources, vexml_opt)
build_and_stamp("musicxml-viewer.js", ["src/musicxml-viewer.js"], vexml_opt)

Depends("demo", Glob("../../vexml/samples/*") + [
                "../vexflow/vexflow-free.js",
                "vexflow-musicxml-free.js",
                "musicxml-viewer.js",
                "../../tests/support/jquery.js",
                "../../vexml/tests/viewer-ajax.html"])
Command("demo", "../../vexml/samples/", [
  Copy("$TARGET", "$SOURCE"),
  Copy("$TARGET", "$TARGET/../../vexflow/vexflow-free.js"),
  Copy("$TARGET", "$TARGET/../vexflow-musicxml-free.js"),
  Copy("$TARGET", "$TARGET/../musicxml-viewer.js"),
  Copy("$TARGET", "$SOURCE/../tests/jquery.js"),
  Copy("$TARGET", "$SOURCE/../tests/viewer-ajax.html")])
