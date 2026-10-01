/**
 * Cyber Arcade - Caesar III (Julius WebAssembly) UI Driver
 * 100% Self-Hosted & Client-Side Emscripten Virtual File System
 */

var filesRead = 0;
var totalFiles = 0;
var C3Dir = "/C3";

var infoElement = document.getElementById("infoLocation");
var statusElement = document.getElementById("status");
var progressElement = document.getElementById("progress");
var spinnerElement = document.getElementById("spinner");
var dirElement = document.getElementById("loaddir");
var loadStatusElement = document.getElementById("loadStatus");
var startOptionsElement = document.getElementById("startOptions");
var confirmElement = document.getElementById("confirm");
var OSDElement = document.getElementById("OSD");
var OSDSpinnerElement = document.getElementById("OSDSpinner");
var OSDStatusElement = document.getElementById("OSDStatus");

function clickSelectFile() {
  dirElement.click();
}

function clickShowMainWindow() {
  Module.showFirstScreen();
}

function dragOverEvent(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
}

function dragEnterEvent() {
  infoElement.classList.add("drag-hover");
}

function dragLeaveEvent() {
  infoElement.classList.remove("drag-hover");
}

function dropEvent(e) {
  e.stopPropagation();
  e.preventDefault();
  removeEventListeners();
  infoElement.classList.remove("drag-hover");
  Module.loadDirFromDropTarget(e.dataTransfer);
}

function addFileUploadEventListeners() {
  if (dirElement.webkitdirectory && !BrowserSupport.canLoadFolder) {
    dirElement.webkitdirectory = false;
  }
  if (BrowserSupport.canUseDragDrop()) {
    infoElement.addEventListener("dragover", dragOverEvent, false);
    infoElement.addEventListener("dragenter", dragEnterEvent, false);
    infoElement.addEventListener("dragleave", dragLeaveEvent, false);
    infoElement.addEventListener("drop", dropEvent, false);
  }
}

function removeEventListeners() {
  infoElement.removeEventListener("dragover", dragOverEvent, false);
  infoElement.removeEventListener("dragenter", dragEnterEvent, false);
  infoElement.removeEventListener("dragleave", dragLeaveEvent, false);
  infoElement.removeEventListener("drop", dropEvent, false);
}

function removeUploadedFiles() {
  dirElement.value = null;
}

function processFileEntry(entry, path) {
  path = path || "";
  if (entry.isFile) {
    entry.file(
      function(file) {
        Module.loadFile(file, (path + file.name).toLowerCase());
      },
      function(err) {
        Module.FSError = true;
        console.error(err);
      }
    );
  } else if (entry.isDirectory) {
    var dirName = (path + entry.name).toLowerCase();
    try {
      FS.mkdir(C3Dir + "/" + dirName, 511);
    } catch(e) {}
    filesRead++;
    var reader = entry.createReader();
    reader.readEntries(function readNext(entries) {
      totalFiles += entries.length;
      for (var i = 0; i < entries.length; i++) {
        processFileEntry(entries[i], dirName + "/");
      }
      if (entries.length > 0) {
        reader.readEntries(readNext);
      }
    });
  }
}

function addInfoElementClickEvent(fn) {
  infoElement.style.cursor = "pointer";
  setTimeout(function() {
    infoElement.addEventListener("click", fn, { once: true });
  }, 50);
}

dirElement.addEventListener("change", function(e) {
  removeEventListeners();
  Module.loadDirFromInput(e.target.files);
}, false);

var BrowserSupport = {
  hasZip: false,
  canDownloadSaves: false,
  canLoadZip: false,
  canReadFile: false,
  canLoadFolder: false,
  canDragDrop: false,
  canDragDropFolder: false,
  canDragDropZip: false,
  isAndroid: navigator.userAgent.toLowerCase().indexOf("android") > -1,
  check: function() {
    BrowserSupport.hasZip = typeof JSZip !== "undefined";
    BrowserSupport.canDownloadSaves = typeof saveAs !== "undefined" && BrowserSupport.hasZip && JSZip.support.blob;
    BrowserSupport.canLoadZip = BrowserSupport.hasZip && JSZip.support.uint8array;
    BrowserSupport.canReadFile = typeof FileReader !== "undefined" && typeof ArrayBuffer !== "undefined";
    BrowserSupport.canLoadFolder = BrowserSupport.canReadFile && "webkitdirectory" in dirElement && !BrowserSupport.isAndroid;
    BrowserSupport.canDragDrop = !BrowserSupport.isAndroid && ("draggable" in infoElement || ("ondragstart" in infoElement && "ondrop" in infoElement));
    BrowserSupport.canDragDropFolder = BrowserSupport.canDragDrop && typeof DataTransferItem !== "undefined" && DataTransferItem.prototype.webkitGetAsEntry && BrowserSupport.canReadFile;
    BrowserSupport.canDragDropZip = BrowserSupport.canDragDrop && BrowserSupport.canLoadZip;
  },
  canUseInput: function() {
    return BrowserSupport.canLoadFolder || BrowserSupport.canLoadZip;
  },
  canUseDragDrop: function() {
    return BrowserSupport.canDragDropFolder || BrowserSupport.canDragDropZip;
  }
};

var Module = {
  preRun: [],
  postRun: [],
  addFilesMessage: "",
  running: false,
  syncingFS: false,
  FSError: false,
  totalDependencies: 0,
  
  canvas: (function() {
    var c = document.getElementById("canvas");
    c.addEventListener("webglcontextlost", function(e) {
      Module.setStatus("WebGL context lost. Click anywhere to reload.");
      e.preventDefault();
      addInfoElementClickEvent(function() { window.location.reload(); });
    }, false);
    return c;
  })(),
  
  print: function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");
    console.log("[Julius]", text);
  },
  
  printErr: function(text) {
    if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(" ");
    console.error("[Julius Err]", text);
  },
  
  setStatus: function(text) {
    if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: "" };
    if (text && text !== Module.setStatus.last.text) {
      var match = text.match(/([^(]+)?\((\d+(\.\d+)?)\/(\d+)\)/);
      var now = Date.now();
      if (match && now - Module.setStatus.last.time < 16) return;
      Module.setStatus.last.time = now;
      Module.setStatus.last.text = text;
      
      if (match) {
        text = match[1].trim();
        progressElement.value = 100 * parseInt(match[2], 10);
        progressElement.max = 100 * parseInt(match[4], 10);
        progressElement.style.display = "block";
      } else {
        progressElement.value = null;
        progressElement.max = null;
        progressElement.style.display = "none";
      }
      
      spinnerElement.style.display = text.endsWith("...") ? "block" : "none";
      statusElement.innerHTML = text;
    }
  },
  
  createUploadMessage: function() {
    Module.addFilesMessage = "Ready to build your Roman city!";
  },
  
  showOSD: function(text) {
    OSDElement.style.display = "block";
    OSDSpinnerElement.style.display = text.endsWith("...") ? "inline-block" : "none";
    OSDStatusElement.innerHTML = text;
  },
  
  clearOSD: function() {
    OSDElement.style.display = "none";
  },
  
  showSubWindow: function(el) {
    if (!Module.running) {
      Module.clearOSD();
      infoElement.style.display = "flex";
      loadStatusElement.style.display = "block"; // Always keep status message visible
      startOptionsElement.style.display = (el === startOptionsElement) ? "block" : "none";
      confirmElement.style.display = (el === confirmElement) ? "block" : "none";
    }
  },
  
  showFirstScreen: function() {
    removeEventListeners();
    spinnerElement.style.display = "none";
    Module.showSubWindow(startOptionsElement);
  },
  
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    if (left) {
      Module.setStatus("Preparing WebAssembly engine... (" + (this.totalDependencies - left) + "/" + this.totalDependencies + ")");
    } else {
      Module.setStatus("Engine initialized.");
    }
  },
  
  onRuntimeInitialized: function() {
    BrowserSupport.check();
    Module.createUploadMessage();
    if (!BrowserSupport.canDownloadSaves) {
      var ds = document.getElementById("downloadSaves");
      if (ds) ds.style.display = "none";
    }
    Module.startFS();
  },
  
  startGame: function() {
    if (!Module.running) {
      Module.running = true;
      Module.setStatus("Launching Caesar III...");
      Module.callMain([C3Dir]);
      setTimeout(function() {
        if (Module.running) {
          infoElement.style.display = "none";
          document.getElementById("topNavBar").style.display = "flex";
        }
      }, 1000);
    }
  },
  
  quitGame: function(errCode) {
    Module.running = false;
    infoElement.style.display = "flex";
    document.getElementById("topNavBar").style.display = "none";
    if (errCode) {
      Module.setStatus("Selected files are not a valid Caesar III installation.<br><br>Deleting corrupt files...");
      Module.clearPath(C3Dir);
      FS.syncfs(false, function() {
        Module.setStatus("Storage reset.<br><br>Please select Preloaded Campaign or provide valid Caesar III files.");
        Module.showFirstScreen();
      });
    } else {
      Module.syncFS();
    }
  },
  
  startFS: function() {
    Module.setStatus("Connecting local storage (IndexedDB)...");
    try {
      try { FS.mkdir(C3Dir); } catch(e) {}
      FS.mount(IDBFS, {}, C3Dir);
      FS.syncfs(true, function(err) {
        if (!err) {
          var contents = Object.keys(FS.lookupPath(C3Dir).node.contents);
          if (contents.length === 0) {
            // Storage is empty -> Prompt to start or auto-download campaign
            var pBtn = document.getElementById("primaryPlayBtn");
            if (pBtn) {
              pBtn.innerHTML = "⚡ PLAY CAESAR III (LAUNCH CAMPAIGN)";
              pBtn.onclick = function() { startPreloadedCampaign("lite"); };
            }
            Module.setStatus("Welcome Governor! Click <b>Play Caesar III</b> to start.");
            Module.showFirstScreen();
            addFileUploadEventListeners();
          } else {
            // Already has files -> Show Start Screen with instant play
            var pBtn = document.getElementById("primaryPlayBtn");
            if (pBtn) {
              pBtn.innerHTML = "▶ ENTER ROME (RESUME CAMPAIGN)";
              pBtn.onclick = function() { Module.startGame(); };
            }
            Module.setStatus("🏛️ Roman Empire files ready! Click to enter.");
            Module.showFirstScreen();
          }
        } else {
          Module.handleFSError(err);
        }
      });
    } catch(err) {
      Module.handleFSError(err);
    }
  },
  
  syncFS: function() {
    if (!Module.syncingFS) {
      Module.syncingFS = true;
      var msg = "Saving Roman city to browser storage...";
      if (Module.running) Module.showOSD(msg); else Module.setStatus(msg);
      FS.syncfs(false, function() {
        Module.syncingFS = false;
        if (!Module.running) Module.showFirstScreen();
        Module.clearOSD();
      });
    }
  },
  
  clearPath: function(path) {
    var node = FS.lookupPath(path).node;
    Object.keys(node.contents).forEach(function(sub) {
      var full = path + "/" + sub;
      var stat = FS.stat(full);
      if (stat.mode & 16384) {
        Module.clearPath(full);
        FS.rmdir(full);
      } else {
        FS.unlink(full);
      }
    });
  },
  
  clearFS: function() {
    Module.setStatus("Purging game storage...");
    Module.clearPath(C3Dir);
    FS.syncfs(false, function() {
      Module.setStatus("Storage cleared.<br><br>Click <b>Play Preloaded Campaign</b> to download fresh files.");
      Module.showFirstScreen();
      addFileUploadEventListeners();
    });
  },
  
  handleFSError: function(err) {
    Module.FSError = true;
    console.error("FS Error:", err);
    indexedDB.deleteDatabase(C3Dir);
    Module.setStatus("Local database error:<br><br>" + err + "<br><br>Please reload page.");
    addInfoElementClickEvent(function() { window.location.reload(); });
  },
  
  downloadSaves: function() {
    if (!Module.running && BrowserSupport.canDownloadSaves) {
      var zip = new JSZip();
      var count = 0;
      Module.setStatus("Exporting Roman save files...");
      var node = FS.lookupPath(C3Dir).node;
      Object.keys(node.contents).forEach(function(name) {
        var lower = name.toLowerCase();
        if (lower.endsWith(".sav") || lower.endsWith(".map")) {
          var data = FS.readFile(C3Dir + "/" + name);
          zip.file(name, data);
          count++;
        }
      });
      if (count === 0) {
        Module.setStatus("No active save files found.<br><br><small>(Click to return)</small>");
        addInfoElementClickEvent(clickShowMainWindow);
        return;
      }
      Module.setStatus("Compressing " + count + " save file(s)...");
      zip.generateAsync({ type: "blob" }).then(function(blob) {
        Module.showFirstScreen();
        saveAs(blob, "caesar3_cyber_arcade_saves.zip");
      }, function(e) {
        Module.setStatus("Save export error: " + e);
        addInfoElementClickEvent(clickShowMainWindow);
      });
    }
  },
  
  loadFile: function(file, name) {
    if (!Module.FSError) {
      var reader = new FileReader();
      reader.onloadend = function(targetName) {
        return function(ev) {
          if (!Module.FSError) {
            Module.setStatus("Loading assets: (" + (filesRead + 1) + "/" + totalFiles + ")");
            FS.writeFile(C3Dir + "/" + targetName, new Uint8Array(ev.target.result), { encoding: "binary" });
            if (++filesRead === totalFiles) {
              Module.setStatus("Syncing storage to IndexedDB...");
              FS.syncfs(false, function() {
                removeUploadedFiles();
                Module.startGame();
              });
            }
          }
        };
      }(name);
      reader.onerror = function() {
        Module.FSError = true;
        Module.setStatus("Error reading file: " + reader.error);
        addInfoElementClickEvent(function() { window.location.reload(); });
      };
      reader.readAsArrayBuffer(file);
    }
  },
  
  loadDirFromZipFile: function(zipData) {
    Module.setStatus("Parsing Caesar III archive...");
    JSZip.loadAsync(zipData, { createFolders: true }).then(function(zip) {
      var topLevel = new Set();
      var prefixLen = 0;
      totalFiles = 0;
      filesRead = 0;
      Module.FSError = false;
      
      zip.forEach(function(relPath) {
        var slashIdx = relPath.indexOf("/");
        if (slashIdx !== -1) {
          topLevel.add(relPath.substring(0, slashIdx));
        }
        totalFiles++;
      });
      
      if (topLevel.size === 1) {
        var singleDir = topLevel.values().next().value;
        if (singleDir && !singleDir.includes(".")) {
          prefixLen = singleDir.length + 1;
        }
      }
      if (prefixLen > 0) totalFiles--;
      
      zip.forEach(function(relPath, zipEntry) {
        if (!Module.FSError) {
          var cleanName = relPath.substring(prefixLen).toLowerCase();
          if (cleanName === "") return;
          
          if (zipEntry.dir) {
            try { FS.mkdir(C3Dir + "/" + cleanName, 511); } catch(e) {}
            filesRead++;
          } else {
            zipEntry.async("uint8array").then(function(u8) {
              if (!Module.FSError) {
                Module.setStatus("Extracting assets (" + (filesRead + 1) + "/" + totalFiles + ")");
                var parts = cleanName.split("/");
                var cur = C3Dir;
                for (var p = 0; p < parts.length - 1; p++) {
                  cur += "/" + parts[p];
                  try { FS.mkdir(cur, 511); } catch(e) {}
                }
                FS.writeFile(C3Dir + "/" + cleanName, u8, { encoding: "binary" });
                if (++filesRead === totalFiles) {
                  Module.setStatus("Finalizing Roman Empire storage...");
                  FS.syncfs(false, function() {
                    removeUploadedFiles();
                    Module.startGame();
                  });
                }
              }
            }, function(err) {
              Module.FSError = true;
              Module.setStatus("Extraction error: " + err);
              addInfoElementClickEvent(function() { window.location.reload(); });
            });
          }
        }
      });
    }, function(err) {
      Module.FSError = true;
      Module.setStatus("Failed to open game zip: " + err);
      addInfoElementClickEvent(function() { window.location.reload(); });
    });
  },
  
  loadDirFromInput: function(files) {
    Module.setStatus("Resetting previous files...");
    Module.clearPath(C3Dir);
    filesRead = 0;
    totalFiles = files.length;
    Module.FSError = false;
    
    if (totalFiles !== 1) {
      if (!BrowserSupport.canLoadFolder) {
        Module.setStatus("Folder selection unsupported.<br>Please select a .zip archive instead.");
        addFileUploadEventListeners();
        return;
      }
      for (var l = 0; l < totalFiles; l++) {
        var rel = files[l].webkitRelativePath || files[l].name;
        rel = rel.substring(rel.indexOf("/") + 1).toLowerCase();
        Module.loadFile(files[l], rel);
      }
    } else {
      if (BrowserSupport.canLoadZip && files[0].name.toLowerCase().endsWith(".zip")) {
        Module.loadDirFromZipFile(files[0]);
      } else {
        Module.setStatus("Please provide a valid Caesar III .zip archive.");
        addFileUploadEventListeners();
      }
    }
  },
  
  loadDirFromDropTarget: function(dt) {
    Module.setStatus("Preparing dropped files...");
    Module.clearPath(C3Dir);
    filesRead = 0;
    totalFiles = 0;
    Module.FSError = false;
    
    if (BrowserSupport.canDragDropFolder && dt.items && dt.items.length) {
      var item = dt.items[0];
      var entry = item.webkitGetAsEntry ? item.webkitGetAsEntry() : null;
      if (dt.items.length === 1 && entry) {
        if (entry.isDirectory) {
          var reader = entry.createReader();
          reader.readEntries(function(entries) {
            totalFiles += entries.length;
            for (var i = 0; i < entries.length; i++) processFileEntry(entries[i]);
          });
          return;
        } else if (BrowserSupport.canDragDropZip && entry.name.toLowerCase().endsWith(".zip")) {
          Module.loadDirFromZipFile(item.getAsFile());
          return;
        }
      }
      totalFiles = dt.items.length;
      for (var n = 0; n < dt.items.length; n++) {
        var e = dt.items[n].webkitGetAsEntry ? dt.items[n].webkitGetAsEntry() : null;
        if (e) processFileEntry(e);
      }
      return;
    }
    
    if (dt.files && dt.files.length === 1 && dt.files[0].name.toLowerCase().endsWith(".zip")) {
      Module.loadDirFromZipFile(dt.files[0]);
    } else {
      Module.setStatus("Please drop a single Caesar III .zip archive.");
    }
  }
};

// Cyber Arcade Server Downloader
function startPreloadedCampaign(variant) {
  var zipName = (variant === "full") ? "caesar3_full.zip" : "caesar3_lite.zip";
  var label = (variant === "full") ? "Full Campaign & CD Music (144 MB)" : "Optimized Campaign (82 MB)";
  
  Module.showSubWindow(loadStatusElement);
  Module.setStatus("Downloading " + label + "...");
  progressElement.style.display = "block";
  progressElement.value = 0;
  progressElement.max = 100;
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", zipName, true);
  xhr.responseType = "arraybuffer";
  
  xhr.onprogress = function(e) {
    if (e.lengthComputable) {
      var pct = Math.round((e.loaded / e.total) * 100);
      var mb = (e.loaded / (1024 * 1024)).toFixed(1);
      var totalMb = (e.total / (1024 * 1024)).toFixed(1);
      progressElement.value = pct;
      Module.setStatus("Downloading " + label + ": " + pct + "% (" + mb + "/" + totalMb + " MB)...");
    }
  };
  
  xhr.onload = function() {
    if (xhr.status === 200) {
      Module.setStatus("Unpacking Roman assets into IndexedDB...");
      progressElement.style.display = "none";
      Module.loadDirFromZipFile(xhr.response);
    } else {
      Module.setStatus("Failed to download game archive (HTTP " + xhr.status + ").<br>Please click to retry or upload custom files.");
      addInfoElementClickEvent(clickShowMainWindow);
    }
  };
  
  xhr.onerror = function() {
    Module.setStatus("Network error downloading Roman assets.<br>Please click to retry.");
    addInfoElementClickEvent(clickShowMainWindow);
  };
  
  xhr.send();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(function(e) { console.warn(e); });
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}
