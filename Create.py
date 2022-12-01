#!/usr/bin/env python
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
projectManager.CreateProject("Hello World")


#RESOLVE_SCRIPT_API="/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting"
#RESOLVE_SCRIPT_LIB="/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so"
#PYTHONPATH="$PYTHONPATH:$RESOLVE_SCRIPT_API/Modules/"

#print(os.environ.get('RESOLVE_SCRIPT_API'))
#print(os.environ.get('RESOLVE_SCRIPT_LIB'))
#print(os.environ.get('PYTHONPATH'))

#os.environ['RESOLVE_SCRIPT_API'] = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting"
#os.environ['RESOLVE_SCRIPT_LIB'] = "/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so"
#os.environ['PYTHONPATH'] = "$PYTHONPATH:$RESOLVE_SCRIPT_API/Modules/"
