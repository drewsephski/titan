import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SidebarCardProps {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}

export const SidebarCard: React.FC<SidebarCardProps> = ({ title, icon: Icon, children }) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center">
        {Icon && <Icon className="h-5 w-5 text-primary mr-2" />}
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      {children}
    </CardContent>
  </Card>
);