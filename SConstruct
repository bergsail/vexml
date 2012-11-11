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

build_and_stamp("vexflow-musicxml-dbg.js", vexml_sources, vexml_dbg);
build_and_stamp("vexflow-musicxml-free.js", vexml_sources, vexml_opt);
