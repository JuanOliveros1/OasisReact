import React, { useState } from "react";
import { ArrowLeft, Plus, Phone, MessageSquare, Edit3, Trash2, User } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { toast } from "sonner";

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isPrimary: boolean;
}

interface EmergencyContactsScreenProps {
  onBack: () => void;
}

export function EmergencyContactsScreen({ onBack }: EmergencyContactsScreenProps) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      phone: "(713) 555-0123",
      relationship: "Mother",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Mike Johnson",
      phone: "(713) 555-0124",
      relationship: "Father",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Emma Wilson",
      phone: "(713) 555-0125",
      relationship: "Sister",
      isPrimary: false,
    },
  ]);

  const [isAddingContact, setIsAddingContact] = useState(false);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    relationship: "",
  });

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone || !newContact.relationship) {
      toast.error("Please fill in all fields");
      return;
    }

    const contact: EmergencyContact = {
      id: Date.now().toString(),
      name: newContact.name,
      phone: newContact.phone,
      relationship: newContact.relationship,
      isPrimary: contacts.length === 0, // First contact is primary
    };

    setContacts([...contacts, contact]);
    setNewContact({ name: "", phone: "", relationship: "" });
    setIsAddingContact(false);
    toast.success("Emergency contact added");
  };

  const handleSetPrimary = (id: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    })));
    toast.success("Primary contact updated");
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast.success("Contact removed");
  };

  const handleCall = (name: string, phone: string) => {
    toast.success(`Calling ${name} at ${phone}...`);
  };

  const handleText = (name: string, phone: string) => {
    toast.success(`Opening text message to ${name}...`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 pt-12 pb-4 px-6 sticky top-0 z-40 backdrop-blur-lg bg-white/95">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1>Emergency Contacts</h1>
        </div>
      </div>

      {/* Info Card */}
      <div className="px-6 mt-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white p-2 rounded-lg flex-shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-blue-900">Emergency Contacts</h4>
              <p className="text-sm text-blue-800 mt-1">
                These contacts will be notified in case of emergency. Your primary contact will be called first.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Contact Button */}
      <div className="px-6 mt-6">
        <Dialog open={isAddingContact} onOpenChange={setIsAddingContact}>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#0c7f99] hover:bg-[#0a6a7f] py-6 rounded-2xl">
              <Plus className="w-5 h-5 mr-2" />
              Add Emergency Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  placeholder="(713) 555-0123"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  placeholder="e.g., Mother, Father, Friend"
                />
              </div>
              <div className="flex space-x-3">
                <Button onClick={handleAddContact} className="flex-1">
                  Add Contact
                </Button>
                <Button variant="outline" onClick={() => setIsAddingContact(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contacts List */}
      <div className="px-6 mt-6 space-y-4">
        <h3>Your Emergency Contacts</h3>
        
        {contacts.map((contact) => (
          <Card key={contact.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="bg-[#0c7f99] text-white p-2 rounded-full">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4>{contact.name}</h4>
                    {contact.isPrimary && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{contact.relationship}</p>
                  <p className="text-sm text-gray-500 mt-1">{contact.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {!contact.isPrimary && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSetPrimary(contact.id)}
                    className="text-xs"
                  >
                    Set Primary
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteContact(contact.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <Button
                size="sm"
                className="bg-[#0c7f99] hover:bg-[#0a6a7f] rounded-xl"
                onClick={() => handleCall(contact.name, contact.phone)}
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-xl"
                onClick={() => handleText(contact.name, contact.phone)}
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                Text
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Emergency Info */}
      <div className="px-6 mt-6 pb-6">
        <Card className="p-4 bg-red-50 border-red-200">
          <h4 className="text-red-900">Emergency Information</h4>
          <p className="text-sm text-red-800 mt-2">
            In case of emergency, your primary contact will be automatically notified. 
            Make sure your contact information is up to date.
          </p>
        </Card>
      </div>
    </div>
  );
}
