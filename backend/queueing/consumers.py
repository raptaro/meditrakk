import json
from channels.generic.websocket import AsyncWebsocketConsumer

class RegistrationQueueConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Accept the connection first
        await self.accept()
        
        # Then add to group
        await self.channel_layer.group_add(
            "registration_queue",
            self.channel_name
        )
        
        print(f"✅ WebSocket client connected: {self.channel_name}")
        print(f"📊 Added to group: registration_queue")

    async def disconnect(self, close_code):
        # Remove from group
        await self.channel_layer.group_discard(
            "registration_queue",
            self.channel_name
        )
        print(f"❌ WebSocket client disconnected: {self.channel_name}")

    async def receive(self, text_data):
        # Handle incoming messages from client (if needed)
        try:
            data = json.loads(text_data)
            print(f"📨 Received message from client: {data}")
        except json.JSONDecodeError:
            print("❌ Error parsing incoming WebSocket message")

    async def queue_update(self, event):
        # Send queue updates to client
        data = event["data"]
        print(f"📤 Sending queue_update to client: {self.channel_name}")
        print(f"📦 Data being sent: {data}")
        
        try:
            await self.send(text_data=json.dumps(data))
            print(f"✅ Message successfully sent to {self.channel_name}")
        except Exception as e:
            print(f"❌ Error sending message to {self.channel_name}: {e}")