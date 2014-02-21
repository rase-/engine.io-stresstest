echo "Polling"
node polling $1
echo ""
echo "WebSocket"
node websocket $1
echo ""
echo "Only ws"
node ws $1
