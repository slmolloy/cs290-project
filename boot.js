var cluster = require('cluster')
var numCpus = require('os').cpus().length
cluster.setupMaster({exec: __dirname + '/server.js'})

// Return the node cluster index for each worker
function workerIds() {
  return Object.keys(cluster.workers)
}

// Get number of active workers
function numWorkers() {
  return workerIds().length
}

var stopping = false

// Fork new workers unless stopping
function forkNewWorkers() {
  if (!stopping) {
    console.log('not stopping', numWorkers(), 'of', numCpus, 'running')
    for (var i = numWorkers(); i < numCpus; i++) {
      console.log('forking new worker')
      cluster.fork()
    }
  }
}

// List of workers queued for a restart
var workersToStop = []

// Stop a single worker
// If snot stopped in 60 seconds, send SIGTERM
function stopWorker(worker) {
  console.log('stopping: ', worker.process.pid)
  worker.disconnect()
  var killTimer = setTimeout(function() {
    console.log('timout reached, killing working', worker.process.pid)
    worker.kill()
  }, 600)
  // unref ensures process doesn't stay up just for timeout
  killTimer.unref()
}

// Stop the next worker in the queue
function stopNextWorker() {
  var i = workersToStop.pop()
  var worker = cluster.workers[i]
  if (worker) stopWorker(worker)
}

// Stop all workers at once
function stopAllWorkers() {
  stopping = true
  console.log('stopping all workers')
  workerIds().forEach(function(id) {
    stopWorker(cluster.workers[id])
  })
}

// When new worker is listening, signal the next worker to restart
cluster.on('listening', function() {
  console.log('new worker listening')
  stopNextWorker()
})

// A worker has disconnected for some reason
// Call forkNewWorkers to create any new workers if needed
cluster.on('exit', function() {
  console.log('disconnecting worker')
  forkNewWorkers()
})

// HUP signal sent to master which should restart each worker, one at a time
process.on('SIGHUP', function() {
  console.log('restarting all workers')
  workersToStop = workerIds()
  stopNextWorker()
})

// TERM signal sent to master which should kill all workers at once
process.on('SIGTERM', stopAllWorkers)

// Initial fork of workers
forkNewWorkers()
console.log('app master', process.pid, 'booted')