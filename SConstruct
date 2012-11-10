"""
VexFlow / VeXML Build Script
Requires: SCons, Git, and Google Closure Compiler
"""

from vexflow_scons import *

vexml_sources = [
      "header.js",
      "base.js",
      "element.js",
      "document.js",
      "part.js",
      "attributes.js",
      "measure.js",
      "voice.js",
      "partstaff.js",
      "note.js",
      "chord.js",
      "staffsystem.js"
    ]

Import("dbg opt")

vexml_dbg = dbg.Clone(JS_DEFINES = {})
vexml_opt = opt.Clone(JS_DEFINES = {})

build_and_stamp("vexflow-musicxml-dbg.js", vexml_sources, vexml_dbg);
build_and_stamp("vexflow-musicxml-free.js", vexml_sources, vexml_opt);
