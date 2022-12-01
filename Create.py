#!/usr/local/bin python
import DaVinciResolveScript as dvr_script
resolve = dvr_script.scriptapp("Resolve")
fusion = resolve.Fusion()
projectManager = resolve.GetProjectManager()
projectManager.LoadProject("aig2")
project = projectManager.GetCurrentProject()
timeline = project.GetCurrentTimeline()
timeline.SetCurrentTimecode("00:00:00:00")
newtext = timeline.InsertFusionTitleIntoTimeline("Text+")
toollist = newtext.GetFusionCompByIndex(1).GetToolList()
toollist[1].StyledText = "Hogehoge"


# exec(open("path/to/hoge.py", encoding='utf-8').read())

# projectManager.CreateProject("Hello World")

# RESOLVE_SCRIPT_API="/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting"
# RESOLVE_SCRIPT_LIB="/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so"
# PYTHONPATH="$PYTHONPATH:$RESOLVE_SCRIPT_API/Modules/"

# print(os.environ.get('RESOLVE_SCRIPT_API'))
# print(os.environ.get('RESOLVE_SCRIPT_LIB'))
# print(os.environ.get('PYTHONPATH'))

# os.environ['RESOLVE_SCRIPT_API'] = "/Library/Application Support/Blackmagic Design/DaVinci Resolve/Developer/Scripting"
# os.environ['RESOLVE_SCRIPT_LIB'] = "/Applications/DaVinci Resolve/DaVinci Resolve.app/Contents/Libraries/Fusion/fusionscript.so"
# os.environ['PYTHONPATH'] = "$PYTHONPATH:$RESOLVE_SCRIPT_API/Modules/"
