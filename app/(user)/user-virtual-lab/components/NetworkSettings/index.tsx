"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Network, Globe, Shield, Lock, Unlock, Plus, Trash2 } from "lucide-react";

interface NetworkSettingsProps {
  vm: any;
}

export default function NetworkSettings({ vm }: NetworkSettingsProps) {
  const [publicIpEnabled, setPublicIpEnabled] = useState(true);
  const [firewallEnabled, setFirewallEnabled] = useState(true);
  const [ports, setPorts] = useState([
    { id: 1, port: "22", protocol: "tcp", description: "SSH", isOpen: true },
    { id: 2, port: "80", protocol: "tcp", description: "HTTP", isOpen: true },
    { id: 3, port: "443", protocol: "tcp", description: "HTTPS", isOpen: true }
  ]);
  
  const addPort = () => {
    setPorts([
      ...ports,
      { 
        id: Date.now(), 
        port: "", 
        protocol: "tcp", 
        description: "", 
        isOpen: true 
      }
    ]);
  };
  
  const removePort = (id: number) => {
    setPorts(ports.filter(port => port.id !== id));
  };
  
  const updatePort = (id: number, field: string, value: string | boolean) => {
    setPorts(ports.map(port => 
      port.id === id ? { ...port, [field]: value } : port
    ));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Network className="h-5 w-5" />
            Network Settings
          </CardTitle>
          <CardDescription>
            Configure network access for your virtual machine
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* IP Address Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium">Public IP Address</h3>
                <p className="text-sm text-muted-foreground">
                  Allow external access to your VM
                </p>
              </div>
              <Switch 
                checked={publicIpEnabled} 
                onCheckedChange={setPublicIpEnabled}
                aria-label="Enable public IP address"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ip-address">Current IP Address</Label>
                <div className="flex gap-2">
                  <Input id="ip-address" value={vm.ip} readOnly className="font-mono" />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => navigator.clipboard.writeText(vm.ip)}
                    aria-label="Copy IP address"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
                    </svg>
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>IP Type</Label>
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800">Static</Badge>
                  {publicIpEnabled ? (
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <span>Public</span>
                    </Badge>
                  ) : (
                    <Badge className="bg-slate-100 text-slate-800 flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      <span>Private</span>
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Firewall Section */}
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium">Firewall</h3>
                <p className="text-sm text-muted-foreground">
                  Control access to your VM by configuring firewall rules
                </p>
              </div>
              <Switch 
                checked={firewallEnabled} 
                onCheckedChange={setFirewallEnabled}
                aria-label="Enable firewall"
              />
            </div>
            
            {firewallEnabled && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Open Ports</h4>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 gap-1" 
                    onClick={addPort}
                    aria-label="Add port"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Port</span>
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {ports.map(port => (
                    <div key={port.id} className="flex items-center gap-2">
                      <Input 
                        value={port.port} 
                        onChange={(e) => updatePort(port.id, 'port', e.target.value)}
                        placeholder="Port" 
                        className="w-20 font-mono"
                        aria-label="Port number"
                      />
                      
                      <Select 
                        value={port.protocol} 
                        onValueChange={(value) => updatePort(port.id, 'protocol', value)}
                      >
                        <SelectTrigger className="w-24" aria-label="Protocol">
                          <SelectValue placeholder="Protocol" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tcp">TCP</SelectItem>
                          <SelectItem value="udp">UDP</SelectItem>
                          <SelectItem value="icmp">ICMP</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Input 
                        value={port.description} 
                        onChange={(e) => updatePort(port.id, 'description', e.target.value)}
                        placeholder="Description" 
                        className="flex-1"
                        aria-label="Port description"
                      />
                      
                      <div className="flex items-center gap-2">
                        <Switch 
                          checked={port.isOpen} 
                          onCheckedChange={(checked) => updatePort(port.id, 'isOpen', checked)}
                          aria-label={`Port ${port.port} ${port.isOpen ? 'open' : 'closed'}`}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:text-red-600 hover:bg-red-50"
                          onClick={() => removePort(port.id)}
                          aria-label={`Remove port ${port.port}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>All other incoming traffic will be blocked</span>
                </div>
              </div>
            )}
          </div>
          
          <Separator />
          
          {/* DNS Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Domain Name (DNS)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hostname">Hostname</Label>
                <Input id="hostname" defaultValue={`${vm.name.toLowerCase()}.vm.example.com`} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dns-servers">DNS Servers</Label>
                <Input id="dns-servers" defaultValue="8.8.8.8, 1.1.1.1" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Changes to DNS settings may take up to 24 hours to propagate globally
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline">Reset to Default</Button>
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
      
      {/* Advanced Networking Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Advanced Networking</CardTitle>
          <CardDescription>
            Configure additional network settings for your VM
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subnet">Subnet</Label>
              <Input id="subnet" defaultValue="10.0.0.0/24" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gateway">Default Gateway</Label>
              <Input id="gateway" defaultValue="10.0.0.1" />
            </div>
          </div>
          
          <div className="flex items-start justify-between pt-2">
            <div>
              <h3 className="text-sm font-medium">Enable IPv6</h3>
              <p className="text-sm text-muted-foreground">
                Allow IPv6 connectivity for your VM
              </p>
            </div>
            <Switch id="ipv6" aria-label="Enable IPv6" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4">
          <Button>Apply Advanced Settings</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 