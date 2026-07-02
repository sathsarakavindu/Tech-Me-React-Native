import { io, Socket } from "socket.io-client";
import { domain } from "../api/domain_endpoints";

export interface LocationUpdateData {
  helpId: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

class WebSocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private isConnecting = false;
  private eventListeners: Map<string, Set<(data: any) => void>> = new Map();
  private isConnected = false;

  connect(): void {
    if (this.isConnecting || (this.socket && this.socket.connected)) {
      console.log("WebSocket already connected or connecting");
      return;
    }

    this.isConnecting = true;

    try {
      // Create Socket.IO connection
      this.socket = io(domain, {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: 3000,
        reconnectionDelayMax: 15000,
        timeout: 20000,
        forceNew: true
      });

      // Socket.IO event handlers
      this.socket.on("connect", this.handleConnect.bind(this));
      this.socket.on("disconnect", this.handleDisconnect.bind(this));
      this.socket.on("connect_error", this.handleConnectError.bind(this));
      this.socket.on("error", this.handleError.bind(this));

      // Handle all other events
      this.socket.onAny((eventName: string, ...args: any[]) => {
        this.handleAnyEvent(eventName, args);
      });
    } catch (error) {
      console.error("WebSocket connection error:", error);
      this.isConnecting = false;
      this.handleReconnect();
    }
  }

  private handleConnect(): void {
    console.log("WebSocket connected successfully");
    this.isConnected = true;
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    this.emit("connection-status", { connected: true });
  }

  private handleDisconnect(reason: string): void {
    console.log("WebSocket disconnected:", reason);
    this.isConnected = false;
    this.isConnecting = false;
    this.emit("connection-status", { connected: false });

    if (reason === "io server disconnect" || reason === "transport error") {
      // Reconnect manually for server disconnections
      setTimeout(() => this.connect(), 3000);
    }
  }

  private handleConnectError(error: Error): void {
    console.error("WebSocket connection error:", error.message);
    this.isConnected = false;
    this.isConnecting = false;
    this.emit("error", { error: "Connection failed", details: error.message });
  }

  private handleError(error: Error): void {
    console.error("WebSocket error:", error.message);
    this.emit("error", { error: "WebSocket error", details: error.message });
  }

  private handleAnyEvent(eventName: string, args: any[]): void {
    // Emit custom events to listeners
    if (this.eventListeners.has(eventName)) {
      const listeners = this.eventListeners.get(eventName)!;
      const data = args[0] || {};
      listeners.forEach((listener) => {
        try {
          listener(data);
        } catch (error) {
          console.error("Error in event listener:", error);
        }
      });
    }
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("Max reconnection attempts reached");
      this.emit("error", { error: "Max reconnection attempts reached" });
      return;
    }

    this.reconnectAttempts++;
    const delay = 3000 * Math.pow(1.5, this.reconnectAttempts - 1);
    console.log(
      `Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`
    );

    this.emit("reconnecting", { attempt: this.reconnectAttempts, delay });

    setTimeout(() => {
      if (!this.isConnected) {
        this.connect();
      }
    }, delay);
  }

  sendLocationUpdate(
    helpId: string,
    latitude: number,
    longitude: number
  ): void {
    if (!this.isConnected || !this.socket) {
      console.warn("Cannot send location update: WebSocket not connected");
      return;
    }

    const data: LocationUpdateData = {
      helpId,
      latitude,
      longitude,
      timestamp: Date.now()
    };

    try {
      this.socket.emit("update-location", data);
    } catch (error) {
      console.error("Error sending location update:", error);
    }
  }

  joinHelpRoom(helpId: string): void {
    if (!this.isConnected || !this.socket) {
      console.warn("Cannot join room: WebSocket not connected");
      return;
    }

    try {
      this.socket.emit("join-help-room", helpId);
      console.log(`Joined help room: ${helpId}`);
    } catch (error) {
      console.error("Error joining help room:", error);
    }
  }

  leaveHelpRoom(helpId: string): void {
    if (!this.socket) {
      return;
    }

    try {
      this.socket.emit("leave-help-room", helpId);
      console.log(`Left help room: ${helpId}`);
    } catch (error) {
      console.error("Error leaving help room:", error);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    this.isConnected = false;
    this.isConnecting = false;
    this.reconnectAttempts = 0;
    console.log("WebSocket disconnected manually");
  }

  on(event: string, listener: (data: any) => void): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event)!.add(listener);
  }

  off(event: string, listener: (data: any) => void): void {
    if (this.eventListeners.has(event)) {
      this.eventListeners.get(event)!.delete(listener);
    }
  }

  is_connected(): boolean {
    return this.isConnected && this.socket !== null && this.socket.connected;
  }

  private emit(event: string, data: any): void {
    if (this.eventListeners.has(event)) {
      const listeners = this.eventListeners.get(event)!;
      listeners.forEach((listener) => {
        try {
          listener(data);
        } catch (error) {
          console.error("Error in event listener:", error);
        }
      });
    }
  }
}

// Singleton instance
export const webSocketService = new WebSocketService();
