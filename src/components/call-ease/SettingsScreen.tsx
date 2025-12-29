"use client";

import type { FC } from 'react';
import { useTheme } from "next-themes";
import { Moon, Sun, Bell, Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const SettingsScreen: FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex flex-col h-full bg-muted/30">
            <header className="p-4 border-b bg-card">
                <h1 className="text-2xl font-headline font-bold">Settings</h1>
            </header>
            <div className="flex-grow p-4 space-y-6 overflow-y-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Appearance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="dark-mode" className="flex items-center gap-3">
                                {theme === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                                <span>Dark Mode</span>
                            </Label>
                            <Switch
                                id="dark-mode"
                                checked={theme === 'dark'}
                                onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Notifications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="missed-call-noti" className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <span>Missed Calls</span>
                            </Label>
                            <Switch id="missed-call-noti" defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <Label htmlFor="voicemail-noti" className="flex items-center gap-3">
                                <Bell className="h-5 w-5 text-muted-foreground" />
                                <span>Voicemail</span>
                            </Label>
                            <Switch id="voicemail-noti" defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Call Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                             <Label htmlFor="call-forwarding" className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-muted-foreground" />
                                <span>Call Forwarding</span>
                            </Label>
                            <Switch id="call-forwarding" />
                        </div>
                        <Separator />
                         <div className="flex items-center justify-between">
                            <Label htmlFor="caller-id" className="flex items-center gap-3">
                                <Info className="h-5 w-5 text-muted-foreground" />
                                <span>Caller ID</span>
                            </Label>
                            <Switch id="caller-id" defaultChecked />
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">About</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">App Version</p>
                            <p className="text-sm font-medium">1.0.0</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SettingsScreen;
